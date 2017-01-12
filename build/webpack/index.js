import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import _debug from 'debug'
import pug from 'pug'

import config, {globals, paths, pkg} from '../config'
import utils, {baseLoaders, cssModuleLoaders, generateLoaders, nodeModules} from './utils'
const {NODE_ENV, __DEV__, __PROD__, __TESTING__, __MOCK__} = globals

const debug = _debug('hi:webpack:config')

debug('Create configuration.')
const webpackConfig = {
  target: 'web',
  resolve: {
    modules: [paths.src(), paths.base('packages'), 'node_modules'],
    extensions: ['.js', '.styl', '.pug'],
    enforceExtension: false,
    enforceModuleExtension: false,
    alias: config.compiler_alias
  },
  resolveLoader: {
    modules: [paths.base('packages'), 'node_modules']
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devtool: config.compiler_devtool,
  module: {},
  performance: {
    hints: __PROD__ && !__MOCK__ && 'warning'
  }
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = ['babel-polyfill', paths.src('index.js')]

webpackConfig.entry = {
  app: __DEV__
    ? APP_ENTRY_PATH.concat('webpack-hot-middleware/client')
    : APP_ENTRY_PATH,
  vendor: config.compiler_vendor
}

// ------------------------------------
// Bundle Output
// ------------------------------------

webpackConfig.output = {
  path: paths.dist(),
  publicPath: config.compiler_public_path,
  filename: `[name].[${config.compiler_hash_type}].js`,
  chunkFilename: `[id].[${config.compiler_hash_type}].js`
}

// ------------------------------------
// Loaders
// ------------------------------------

const sourceMap = !!config.compiler_devtool
const STYLUS_LOADER = 'stylus-loader'
let appLoader, bootstrapLoader

webpackConfig.module.rules = [
  ...utils.commonCssLoaders({
    sourceMap,
    exclude: ['styl']
  }),
  ...__TESTING__ ? [{
      test: /\.styl$/,
      loader: generateLoaders(STYLUS_LOADER, baseLoaders),
      exclude: nodeModules
    }] : [{
      test: /[/\\]app\.styl$/,
      loader: generateLoaders(STYLUS_LOADER, baseLoaders, {
        extract: !__DEV__ && (appLoader = new ExtractTextPlugin('app.[contenthash].css'))
      }),
      exclude: nodeModules
    }, {
      test: /[/\\]bootstrap\.styl$/,
      loader: generateLoaders(STYLUS_LOADER, baseLoaders, {
        extract: !__DEV__ && (bootstrapLoader = new ExtractTextPlugin('bootstrap.[contenthash].css'))
      }),
      exclude: nodeModules
    }, {
      test: /[/\\]theme-\w+\.styl$/,
      loader: generateLoaders(STYLUS_LOADER, baseLoaders),
      exclude: nodeModules
    }, {
      test: /^(?!.*[/\\](app|bootstrap|theme-\w+)\.styl$).*\.styl$/,
      loader: generateLoaders(STYLUS_LOADER, cssModuleLoaders),
      exclude: nodeModules
    }], {
    test: /\.styl$/,
    loader: generateLoaders(STYLUS_LOADER, baseLoaders),
    include: nodeModules
  }, {
    test: /\.js$/,
    loader: 'babel-loader?cacheDirectory',
    exclude: nodeModules
  }, {
    test: /\.pug$/,
    loader: `vue-template-es2015-loader!template-file-loader?raw&pretty=${__DEV__}&doctype=html`,
    exclude: nodeModules
  }, {
    test: /\.(png|jpe?g|gif)$/,
    loader: 'url-loader?limit=10000&name=[name].[hash].[ext]!img-loader?minimize&progressive=true'
  },
  {
    test: /\.(svg|woff2?|eot|ttf)$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: '[name].[hash].[ext]'
    }
  }
]

// ------------------------------------
// Plugins
// ------------------------------------

__MOCK__ && debug(`enable mock for ${NODE_ENV}`)

webpackConfig.plugins = [
  new webpack.ContextReplacementPlugin(/\.\/locale$/, null, false, /js$/),
  new webpack.DefinePlugin(globals),
  new webpack.LoaderOptionsPlugin({
    stylus: {
      default: {
        preferPathResolver: 'webpack',
        import: [paths.src('styles/_variables.styl')]
      }
    }
  }),
  new HtmlWebpackPlugin({
    templateContent: pug.renderFile(paths.src('index.pug'), {
      pretty: !config.compiler_html_minify,
      title: `${pkg.name} - ${pkg.description}`
    }),
    favicon: paths.src('static/favicon.ico'),
    hash: false,
    inject: true,
    minify: {
      collapseWhitespace: config.compiler_html_minify,
      minifyJS: config.compiler_html_minify
    }
  }),
  new CopyWebpackPlugin([{
    from: paths.src('static')
  }], {
    ignore: ['*.ico', '*.md']
  })
]

// Don't split bundles during testing, since we only want import one bundle
if (!__TESTING__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor']
    }))
}

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else if (!__TESTING__) {
  debug(`Enable plugins for ${NODE_ENV} (OccurenceOrder, Dedupe & UglifyJS).`)
  debug(`Extract styles of app and bootstrap for ${NODE_ENV}.`)
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: !sourceMap,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      comments: false,
      sourceMap
    }),
    // 将 bootstrap 和 app 分别导出到单独的文件中, 这里的顺序就是被注入到 HTML 中时加载的顺序
    bootstrapLoader,
    appLoader
  )
}

export default webpackConfig

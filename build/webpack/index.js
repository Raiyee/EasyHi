import fs from 'fs'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlRewriteWebpackPlugin from 'html-rewrite-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import _debug from 'debug'
import pug from 'pug'

import config, {globals, paths, pkg} from '../config'
import utils, {baseLoaders, cssModuleLoaders, generateLoaders, localIdentName, nodeModules} from './utils'
const {TRUE_NODE_ENV, __DEV__, __PROD__, __TESTING__, __MOCK__} = globals

const debug = _debug('koa:webpack:config')

debug('Create configuration.')
const webpackConfig = {
  target: 'web',
  resolve: {
    modules: [paths.src(), paths.base('packages'), 'node_modules'],
    extensions: ['.js', '.vue', '.styl', '.pug'],
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
    hints: !__DEV__
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
    loader: generateLoaders(STYLUS_LOADER, baseLoaders, {
      sourceMap
    }),
    exclude: nodeModules
  }] : [{
    test: /[/\\]app\.styl$/,
    loader: generateLoaders(STYLUS_LOADER, baseLoaders, {
      sourceMap,
      extract: !__DEV__ && (appLoader = new ExtractTextPlugin('app.[contenthash].css'))
    }),
    exclude: nodeModules
  }, {
    test: /[/\\]bootstrap\.styl$/,
    loader: generateLoaders(STYLUS_LOADER, baseLoaders, {
      sourceMap,
      extract: !__DEV__ && (bootstrapLoader = new ExtractTextPlugin('bootstrap.[contenthash].css'))
    }),
    exclude: nodeModules
  }, {
    test: /[/\\]theme-\w+\.styl$/,
    loader: generateLoaders(STYLUS_LOADER, baseLoaders, {
      sourceMap
    }),
    exclude: nodeModules
  }, {
    test: /^(?!.*[/\\](app|bootstrap|theme-\w+)\.styl$).*\.styl$/,
    loader: generateLoaders(STYLUS_LOADER, cssModuleLoaders, {
      sourceMap
    }),
    exclude: nodeModules
  }], {
    test: /\.styl$/,
    loader: generateLoaders(STYLUS_LOADER, baseLoaders, {
      sourceMap
    }),
    include: nodeModules
  }, {
    test: /\.js$/,
    loader: 'babel-loader?cacheDirectory',
    exclude: nodeModules
  }, {
    test: /\.pug$/,
    loader: `vue-template-es2015-loader!pug-html-loader?exports=false&pretty=${__DEV__}`,
    exclude: nodeModules
  }, {
    test: /\.vue$/,
    // loader: 'vue-loader',
    loader: 'vue-promise-loader',
    options: {
      loaders: {
        ...utils.vueCssLoaders({
          sourceMap
        })
      },
      autoprefixer: false,
      cssModules: {
        camelCase: true,
        localIdentName
      },
      defaultLang: {
        template: 'pug',
        styles: 'styl'
      }
    }
  },
  {
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

__MOCK__ && debug(`enable mock for ${TRUE_NODE_ENV}`)

const postcss = []

let templateContent = fs.readFileSync(paths.src('index.pug')).toString()

__MOCK__ && (templateContent = templateContent.replace(/\/\/pre /g, ''))

webpackConfig.plugins = [
  new webpack.ContextReplacementPlugin(/\.\/locale$/, null, false, /js$/),
  new webpack.DefinePlugin(globals),
  new webpack.LoaderOptionsPlugin({
    minimize: __PROD__,
    debug: __DEV__,
    options: {
      context: __dirname,
      postcss
    },
    stylus: {
      default: {
        preferPathResolver: 'webpack',
        import: [paths.src('styles/_variables.styl')]
      }
    }
  }),
  new HtmlWebpackPlugin({
    filename: `index.${__MOCK__ ? 'html' : 'pug'}`,
    templateContent: pug.render(templateContent, {
      pretty: !__MOCK__ || !config.compiler_html_minify,
      title: `${pkg.name} - ${pkg.description}`
    }),
    favicon: paths.src('static/favicon.ico'),
    hash: false,
    inject: true,
    minify: {
      collapseWhitespace: __MOCK__ && config.compiler_html_minify,
      minifyJS: config.compiler_html_minify
    }
  }),
  new CopyWebpackPlugin([{
    from: paths.src('static')
  }], {
    ignore: ['*.ico', '*.md']
  })
]

__MOCK__ || webpackConfig.plugins.push(new HtmlRewriteWebpackPlugin({
  afterHtmlProcessing: htmlPluginData => {
    htmlPluginData.html = htmlPluginData.html.replace(/(<!--pre )(.*)(-->)/g, (math, $1, $2, $3) => $2)
  }
}))

// Don't split bundles during testing, since we only want import one bundle
if (!__TESTING__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }))
}

const browsers = config.compiler_browsers

if (__DEV__ || __TESTING__) {
  debug(`Enable postcss processor(autoprefixer) for ${TRUE_NODE_ENV}`)

  postcss.push(autoprefixer({browsers}))

  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  debug(`Enable postcss processor(cssnano) for ${TRUE_NODE_ENV}`)

  postcss.push(cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    normalizeUrl: false,
    reduceIdents: false,
    safe: true,
    sourcemap: sourceMap
  }))

  debug(`Enable plugins for ${TRUE_NODE_ENV} (OccurenceOrder, Dedupe & UglifyJS).`)
  debug(`Extract styles of app and bootstrap for ${TRUE_NODE_ENV}.`)
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    // 将 bootstrap 和 app 分别导出到单独的文件中, 这里的顺序就是被注入到 HTML 中时加载的顺序
    bootstrapLoader,
    appLoader
  )
}

export default webpackConfig

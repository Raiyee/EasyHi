import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import _debug from 'debug'
import config, {paths, pkg} from '../config'
import utils, {baseLoaders, cssModuleLoaders, generateLoaders, nodeModules} from './utils'
const {TRUE_NODE_ENV, __DEV__, __PROD__} = config.globals

const debug = _debug('koa:webpack:config')

debug('Create configuration.')
const webpackConfig = {
  target: 'web',
  resolve: {
    modules: [paths.src(), 'node_modules'],
    descriptionFiles: ['package.json'],
    mainFields: ['main', 'browser'],
    mainFiles: ['index'],
    extensions: ['.vue', '.js', '.styl'],
    // extensions: ['.js', '.vue', '.styl'],
    enforceExtension: false,
    enforceModuleExtension: false
  },
  resolveLoader: {
    modules: ['node_modules'],
    descriptionFiles: ['package.json'],
    mainFields: ['main'],
    mainFiles: ['index'],
    extensions: ['.js'],
    enforceExtension: false,
    enforceModuleExtension: false,
    moduleExtensions: ['-loader']
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devtool: config.compiler_devtool,
  module: {}
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
let appLoader, bootstrapLoader

webpackConfig.module.rules = [
  ...utils.commonCssLoaders({
    sourceMap,
    exclude: ['styl']
  }),
  {
    test: /[/\\]app\.styl/,
    loader: generateLoaders('stylus', baseLoaders, {
      sourceMap,
      extract: !__DEV__ && (appLoader = new ExtractTextPlugin('app.[contenthash].css'))
    }),
    exclude: nodeModules
  },
  {
    test: /[/\\]bootstrap\.styl/,
    loader: generateLoaders('stylus', baseLoaders, {
      sourceMap,
      extract: !__DEV__ && (bootstrapLoader = new ExtractTextPlugin('bootstrap.[contenthash].css'))
    }),
    exclude: nodeModules
  },
  {
    test: /[/\\]theme-\w+\.styl/,
    loader: generateLoaders('stylus', baseLoaders, {
      sourceMap
    }),
    exclude: nodeModules
  },
  {
    test: /^(?!.*[/\\](app|bootstrap|theme-\w+)\.styl).*\.styl/,
    loader: generateLoaders('stylus', cssModuleLoaders, {
      sourceMap
    }),
    exclude: nodeModules
  },
  {
    test: /\.styl/,
    loader: generateLoaders('stylus', baseLoaders, {
      sourceMap
    }),
    include: nodeModules
  },
  {
    test: /\.js$/,
    loader: 'babel',
    exclude: nodeModules
  },
  {
    test: /\.vue$/,
    loader: 'vue'
  },
  {
    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/,
    loader: 'url',
    query: {
      limit: 10000
    }
  }
]

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: paths.src('index.ejs'),
    title: `${pkg.name} - ${pkg.description}`,
    // title: pkg.name,
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
    // ignore: ['*.ico', '*.md']
  })
]

const browsers = config.compiler_browsers

const LOADER_OPTIONS = {
  minimize: __PROD__,
  debug: __DEV__,
  options: {
    context: __dirname
  },
  vue: {
    loaders: utils.vueCssLoaders({
      sourceMap
    }),
    autoprefixer: false
  }
}

if (__DEV__) {
  debug(`Enable postcss processor(autoprefixer) for ${TRUE_NODE_ENV}`)

  LOADER_OPTIONS.options.postcss = [
    autoprefixer({
      browsers
    })
  ]

  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else {
  debug(`Enable postcss processor(cssnano) for ${TRUE_NODE_ENV}`)

  LOADER_OPTIONS.options.postcss = [
    cssnano({
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
    })
  ]

  debug(`Enable plugins for ${TRUE_NODE_ENV} (OccurenceOrder, Dedupe & UglifyJS).`)
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
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

webpackConfig.plugins.push(
  new webpack.LoaderOptionsPlugin(LOADER_OPTIONS),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  })
)

export default webpackConfig

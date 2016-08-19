import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cssnano from 'cssnano';
import _debug from 'debug';
import config, {paths, pkg} from '../config';
import utils, {baseLoaders, cssModuleLoaders, generateLoaders, nodeModules} from './utils';
const {TRUE_NODE_ENV, __DEV__, __PROD__, __TEST__} = config.globals;

const debug = _debug('koa:webpack:config');

debug('Create configuration.');
const webpackConfig = {
  __DEV__,
  __PROD__,
  __TEST__,
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    alias: {
      vue: 'vue/dist/vue'
    },
    extensions: ['', '.js', '.styl'],
    modules: ['node_modules', 'src']
  },
  module: {},
  node: {
    fs: 'empty'
  }
};

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = ['babel-polyfill', paths.src('index.js')];

webpackConfig.entry = {
  app: __DEV__
    ? APP_ENTRY_PATH.concat('webpack-hot-middleware/client')
    : APP_ENTRY_PATH,
  vendor: config.compiler_vendor
};

// ------------------------------------
// Bundle Output
// ------------------------------------

webpackConfig.output = {
  path: paths.dist(),
  publicPath: config.compiler_public_path,
  filename: `[name].[${config.compiler_hash_type}].js`,
  chunkFilename: `[id].[${config.compiler_hash_type}].js`
};

// ------------------------------------
// Pre-Loaders
// ------------------------------------

webpackConfig.module.preLoaders = [
  {
    test: /\.(js|vue)$/,
    loader: 'eslint',
    exclude: /node_modules/,
    query: {
      emitWarning: __DEV__
    }
  }
];

// ------------------------------------
// Loaders
// ------------------------------------

const sourceMap = !!config.compiler_devtool;
let appLoader, bootstrapLoader;

webpackConfig.module.loaders = [
  ...utils.commonCssLoaders({
    sourceMap,
    exclude: ['less', 'stylus']
  }),
  {
    test: /\.less$/,
    loader: generateLoaders('less', cssModuleLoaders, {
      sourceMap
    }),
    exclude: nodeModules
  },
  {
    test: /\/bootstrap\.less$/,
    loader: generateLoaders('less', baseLoaders, {
      sourceMap,
      extract: !__DEV__ && (bootstrapLoader = new ExtractTextPlugin('bootstrap.[contenthash].css'))
    }),
    include: nodeModules
  },
  {
    test: /^(?!.*\/bootstrap\.less$).*\.less$/,
    loader: generateLoaders('less', baseLoaders, {
      sourceMap
    }),
    include: nodeModules
  },
  {
    test: /\/app\.stylus/,
    loader: generateLoaders('stylus', baseLoaders, {
      sourceMap,
      extract: !__DEV__ && (appLoader = new ExtractTextPlugin('app.[contenthash].css'))
    }),
    exclude: nodeModules
  },
  {
    test: /\.js$/,
    loader: 'babel',
    exclude: nodeModules
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.html$/,
    loader: 'vue-html'
  },
  {
    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10000
    }
  },
  {
    test: /\.vue$/,
    loader: 'vue'
  }
];

webpackConfig.vue = {
  loaders: utils.vueCssLoaders({
    sourceMap
  }),
  autoprefixer: false
};

webpackConfig.eslint = {
  formatter: require('eslint-friendly-formatter')
};

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
];

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else {
  debug(`Enable postcss processors for ${TRUE_NODE_ENV}`);

  webpackConfig.postcss = [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['> 0%']
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
  ];

  debug(`Enable plugins for ${TRUE_NODE_ENV} (OccurenceOrder, Dedupe & UglifyJS).`);
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(true),
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
  );
}

webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor']
}));

export default webpackConfig;

import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import _debug from 'debug';
import config, {paths, pkg} from '../config';
import utils from './utils';
const {__DEV__, __PROD__, __TEST__} = config.globals;

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
    extensions: ['', '.css', '.js', '.json', '.vue'],
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
  app: __PROD__
    ? APP_ENTRY_PATH
    : APP_ENTRY_PATH.concat('webpack-hot-middleware/client'),
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

const sourceMap = config.compiler_source_map && !__PROD__;

webpackConfig.module.loaders = [
  {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/
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
].concat(utils.commonCssLoaders({
  sourceMap
}));

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

if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
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
    // extract css into its own file
    new ExtractTextPlugin('[name].[contenthash].css')
  );
} else {
  debug('Enable plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }));
}

export default webpackConfig;

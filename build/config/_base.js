import path from 'path'
import {argv} from 'yargs'
import _debug from 'debug'

const debug = _debug('koa:config:base')

const TRUE_NODE_ENV = process.env.NODE_ENV || 'development'
const NODE_ENV = TRUE_NODE_ENV === 'test' ? 'production' : TRUE_NODE_ENV

const config = {
  env: TRUE_NODE_ENV,

  pkg: require('../../package.json'),

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '../../'),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: 'local.1stg.me',
  server_port: process.env.PORT || 3000,
  server_mock: !!argv.mock,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_html_minify: false,
  compiler_css_modules: false,
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_quiet: false,
  compiler_browsers: ['> 0%'],
  compiler_public_path: '',
  compiler_stats: {
    colors: true
  },
  compiler_alias: {
    http: 'axios',
    vue: 'vue/dist/vue',
    'vue-touch': 'vue-touch-easyhi',
  },
  compiler_vendor: [
    'axios',
    'moment',
    'vue',
    'vue-lazyload',
    'vue-router',
    'vue-touch',
    'vuex',
    'vuex-actions',
    'vuex-localstorage'
  ]
}

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(NODE_ENV)
  },
  NODE_ENV: NODE_ENV,
  TRUE_NODE_ENV: TRUE_NODE_ENV,
  __DEV__: TRUE_NODE_ENV === 'development',
  __PROD__: TRUE_NODE_ENV === 'production',
  __TEST__: TRUE_NODE_ENV === 'test',
  IMG_PATH_PREFIX: JSON.stringify('http://lorempixel.com/')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
config.compiler_vendor = config.compiler_vendor
  .filter(dep => ({...config.pkg.dependencies, ...config.compiler_alias}.hasOwnProperty(dep) ? true : debug(
    'Package "' + dep + '" was not found as an npm dependency in package.json; ' +
    'it won\'t be included in the webpack vendor bundle.\n' +
    'Consider removing it from compiler_vendor in "./config/_base.js"'
  )))

// ------------------------------------
// Utilities
// ------------------------------------
config.paths = (() => {
  const resolve = path.resolve

  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base,
    src: base.bind(null, config.dir_src),
    dist: base.bind(null, config.dir_dist),
    server: base.bind(null, config.dir_server),
    test: base.bind(null, config.dir_test)
  }
})()

export default config

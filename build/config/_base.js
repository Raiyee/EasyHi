const path = require('path')
const {argv} = require('yargs')
const debug = require('debug')('hi:config')
const pkg = require('../../package.json')

const TRUE_NODE_ENV = process.env.NODE_ENV || 'development'
const NODE_ENV = TRUE_NODE_ENV === 'test' ? 'production' : TRUE_NODE_ENV
const VUE_ENV = process.env.VUE_ENV || 'browser'

module.exports = {
  env: TRUE_NODE_ENV,
  pkg,
  serverHost: 'local.1stg.me',
  serverPort: process.env.PORT || 3000,
  serverMock: !!argv.mock,
  compilerHtmlMinify: false,
  compilerDevTool: 'source-map',
  compilerBrowsers: ['> 0%'],
  compilerVendor: [
    'vue',
    'vue-router',
    'vuex'
  ].filter(dep => {
    if (pkg.dependencies.hasOwnProperty(dep)) return true

    debug(
      'Package "' + dep + '" was not found as an npm dependency in package.json; ' +
      'it won\'t be included in the webpack vendor bundle.\n' +
      'Consider removing it from compiler_vendor in "./config/_base.js"'
    )
  }),
  globals: {
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    },
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    'process.env.VUE_ENV': JSON.stringify(VUE_ENV),
    NODE_ENV: NODE_ENV,
    TRUE_NODE_ENV: TRUE_NODE_ENV,
    __DEV__: TRUE_NODE_ENV === 'development',
    __PROD__: TRUE_NODE_ENV === 'production',
    __TEST__: TRUE_NODE_ENV === 'test',
    __SERVER__: VUE_ENV === 'server'
  },
  paths: function () {
    const resolve = path.resolve
    const base = (...args) =>
      resolve.apply(resolve, [resolve(__dirname, '../..'), ...args])

    return {
      base,
      src: base.bind(null, 'src'),
      dist: base.bind(null, 'dist'),
      server: base.bind(null, 'server'),
      test: base.bind(null, 'test')
    }
  }()
}

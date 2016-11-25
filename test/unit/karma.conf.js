import config from '../../build/config'
import webpackConfig from '../../build/webpack'

const debug = require('debug')('koa:karma')
debug('Create configuration.')

const alias = {...webpackConfig.resolve.alias, vue: 'vue/dist/vue'}

const karmaConfig = {
  basePath: '../../', // project root in relation to bin/karma.js
  files: [
    './node_modules/babel-polyfill/dist/polyfill.js',
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    './node_modules/sinon/pkg/sinon.js',
    {
      pattern: `./${config.dir_test}/unit/index.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  proxies: {
    // '/api/': 'http://localhost:3000/api/'
  },
  singleRun: config.coverage_enabled,
  frameworks: ['mocha', 'es6-shim'],
  preprocessors: {
    [`${config.dir_test}/unit/index.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
    reporters: config.coverage_reporters
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: webpackConfig.devtool,
    resolve: {...webpackConfig.resolve, alias},
    plugins: webpackConfig.plugins,
    module: {
      rules: webpackConfig.module.rules
    },
    node: webpackConfig.node
  },
  webpackMiddleware: {
    noInfo: true
  }
}

export default cfg => cfg.set(karmaConfig)

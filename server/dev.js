import middleware from 'koa-webpack'
import _debug from 'debug'
import config from '../build/webpack'
const debug = _debug('koa:webpack-dev')
import compiler from '../build/config'

export default app => {
  debug('Enable Webpack Dev Middleware & Hot Module Replacement (HMR).')

  app.use(middleware({
    config,
    dev: {
      publicPath: compiler.compiler_public_path,
      hot: true,
      quiet: compiler.compiler_quiet,
      noInfo: compiler.compiler_quiet,
      lazy: false,
      stats: compiler.compiler_stats
    }
  }))

  if (compiler.server_mock) { // eslint-disable-line camelcase
  }
}

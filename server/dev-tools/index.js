import webpack from 'webpack'
import devMiddleware from './webpack-dev'
import hotMiddleware from './webpack-hot'
import historyFallback from './history-fallback'
import webpackConfig from '../../build/webpack'

export default app => {
  const compiler = webpack(webpackConfig)
  app.use(historyFallback())
  app.use(devMiddleware(compiler))
  app.use(hotMiddleware(compiler))
}

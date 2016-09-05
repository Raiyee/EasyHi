import webpack from 'webpack'
import devMiddleware from './middleware/webpack-dev'
import hotMiddleware from './middleware/webpack-hot'
import webpackConfig from '../../build/webpack'

export default app => {
  const compiler = webpack(webpackConfig)

  app.use(devMiddleware(compiler))
  app.use(hotMiddleware(compiler))
}

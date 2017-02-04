import Koa from 'koa'
import logger from 'koa-logger'
import compress from 'koa-compress'
import serve from './static'
import _debug from 'debug'
import config from '../build/config'
import error from './error'
import history from './history'
import dev from './dev-tools'

const debug = _debug('hi:server')

// Koa application is now a class and requires the new operator.
const app = new Koa()

app.use(history())

app.use(compress())

app.use(logger())

// handle error
app.use(error())

// ------------------------------------
// Apply Webpack DEV/HMR Middleware
// ------------------------------------
config.globals.__DEV__ ? dev(app) : app.use(serve(config.paths.dist(), {
  context: '/yoga-vision',
  maxAge: 365 * 24 * 60 * 60
}))

const args = [config.server_port, config.server_host]

export default app.listen(...args, err =>
  debug.apply(null, err ? [err] : ['Server is now running at %s:%s.', ...args.reverse()]))

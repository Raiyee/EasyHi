import Koa from 'koa'
import logger from 'koa-logger'
import serve from 'koa-static'
import _debug from 'debug'
import config from '../build/config'
import error from './error'
import dev from './dev'

const debug = _debug('koa:server')
const paths = config.paths

// Koa application is now a class and requires the new operator.
const app = new Koa()
app.use(logger())

// last
app.use(error())

// ------------------------------------
// Apply Webpack DEV/HMR Middleware
// ------------------------------------
if (app.env !== 'development') {
  // static with cache
  app.use(serve(paths.dist(), {
    maxAge: 365 * 24 * 60 * 60
  }))
} else {
  dev(app)
}

const {
  server_host,
  server_port
} = config

/* eslint-disable camelcase */
const args = [server_port]

if (server_host) {
  args.push(server_host)
}
/* eslint-enable camelcase */

args.push(err => {
  if (err) {
    debug(err)
    return
  }
  debug('Server is now running at %s:%s.', server_host, server_port)
})

export default app.listen(...args)

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import _debug from 'debug'

import config, {compiler_browsers as browsers, compiler_devtool as sourcemap} from '../config'

const {TRUE_NODE_ENV, __DEV__} = config.globals

const debug = _debug('koa:postcss:config')

let plugins = []

if (__DEV__) {
  debug(`Enable postcss processor(autoprefixer) for ${TRUE_NODE_ENV}`)

  plugins.push(autoprefixer({
    browsers
  }))
} else {
  debug(`Enable postcss processors for ${TRUE_NODE_ENV}`)

  plugins.push(() => cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    normalizeUrl: false,
    reduceIdents: false,
    safe: true,
    sourcemap
  }))
}

export default () => ({
  plugins
})

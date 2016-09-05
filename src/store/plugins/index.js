import createLogger from 'vuex/logger'
import createPromise from 'vuex-promise'

import {
  PROMISE_PENDING,
  PROMISE_SUCCESS,
  PROMISE_FAILURE,
  PROMISE_FINALLY
} from '../constants'

const plugins = [
  createPromise({
    debug: __DEV__,
    status: {
      PENDING: PROMISE_PENDING,
      SUCCESS: PROMISE_SUCCESS,
      FAILURE: PROMISE_FAILURE,
      FINALLY: PROMISE_FINALLY
    },
    silent: false
  }),
  store => {
    // 实现进度条、错误提示
    store.subscribe(({meta = {}, payload}) => {
      switch (meta.promise) {
        case PROMISE_PENDING:
          store.dispatch('setProgress', 60)
          break
        case PROMISE_SUCCESS:
          store.dispatch('setProgress', 100)
          break
        case PROMISE_FAILURE:
          store.dispatch('setProgress', 100)
          store.dispatch('addToast', payload)
          break
        default:
          // setProgress(0)
      }
    })
  }
]

if (__DEV__) {
  plugins.unshift(createLogger())
}

export default plugins

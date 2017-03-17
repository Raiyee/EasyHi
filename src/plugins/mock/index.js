import utils, {EMPTY_FUNC} from 'utils'
import * as constants from './constants'
import * as random from './random'
import * as tool from './tool'

Object.assign(utils, constants, random, tool)

const modules = require.context('../..', true, /\/mock\.js$/)

modules.keys().forEach(key => modules(key))

setTimeout(() => {
  typeof WeixinJSBridge === 'undefined' && (window.WeixinJSBridge = {
    call: EMPTY_FUNC,
    invoke(apiName, config, callback) {
      callback({err_msg: ''})
    },
    log: EMPTY_FUNC,
    on: EMPTY_FUNC
  })
}, 2000)

import utils, {getItem} from 'utils'
import {PERMISSION} from 'store/constants'

utils.randomImg = (w, h = w, random = 1, type = 'people') => `${type}?w=${w}&h=${h}&random=${random}`

window.__INITIALIZE_STATE__ = getItem(PERMISSION)

const modules = require.context('..', true, /\/mock\.js$/)

modules.keys().forEach(key => modules(key))

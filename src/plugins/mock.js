import {getItem} from 'utils'
import {PERMISSION} from 'store/constants'

window.__INITIALIZE_STATE__ = getItem(PERMISSION)

const modules = require.context('..', true, /\/mock\.js$/)

modules.keys().forEach(key => modules(key))

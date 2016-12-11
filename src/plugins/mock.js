import utils, {getItem} from 'utils'
import * as random from './random'
import {PERMISSION} from 'store/constants'

Object.assign(utils, random)

window.__INITIALIZE_STATE__ = getItem(PERMISSION)

const modules = require.context('..', true, /\/mock\.js$/)

modules.keys().forEach(key => modules(key))

import utils, {getItem} from 'utils'
import * as random from './random'
import * as constants from './constants'
import {PERMISSION} from 'store/constants'

Object.assign(utils, random)
Object.assign(utils, constants)

window.__INITIALIZE_STATE__ = getItem(PERMISSION)

const modules = require.context('..', true, /\/mock\.js$/)

modules.keys().forEach(key => modules(key))

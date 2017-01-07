import utils from 'utils'
import * as random from './random'
import * as constants from './constants'

Object.assign(utils, random)
Object.assign(utils, constants)

const modules = require.context('..', true, /\/mock\.js$/)

modules.keys().forEach(key => modules(key))

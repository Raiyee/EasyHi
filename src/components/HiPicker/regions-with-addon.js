import {omitObj} from 'utils'

import regions from './regions'
import addon from './regions-addon'

const KEY = 100000

Object.assign(regions[KEY], addon[KEY])

export default Object.assign(regions, omitObj(addon, KEY))

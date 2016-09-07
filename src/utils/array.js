import {isArray, isObject} from './base'
import {isNumber} from './number'

export const isArrayLike = value => isArray(value) || isObject(value) && isNumber(value && value.length)

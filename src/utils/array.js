import {isFunction} from './base'
import {isLength} from './number'
import {isObjectLike} from './object'

export const isArrayLike = value => value != null && isLength(value.length) && !isFunction(value)

export const isArrayLikeObject = value => isArrayLike(value) && isObjectLike(value)

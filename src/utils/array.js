import {isArray, isFunction} from './base'
import {isLength} from './number'
import {isObjectLike} from './object'

export const isArrayLike = value => value != null && isLength(value.length) && !isFunction(value)

export const isArrayLikeObject = value => isArrayLike(value) && isObjectLike(value)

export const isEmptyArr = value => isArray(value) && !value.length

export const nonEmptyArr = value => isArray(value) && !!value.length

export const remove = (arr, item) => {
  if (!arr.length) return
  const index = arr.indexOf(item)
  if (index > -1) return arr.splice(index, 1)[0]
}

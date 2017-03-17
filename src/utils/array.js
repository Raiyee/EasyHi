import {isArray, isFunction} from './base'
import {isLength} from './number'
import {isObjectLike} from './object'

export const isArrayLike = value => value != null && isLength(value.length) && !isFunction(value)

export const isArrayLikeObject = value => isArrayLike(value) && isObjectLike(value)

export const isEmptyArr = value => isArray(value) && !value.length

export const nonEmptyArr = value => isArray(value) && !!value.length

export const emptyArr = length => new Array(length).fill(undefined)

export const remove = (arr, item) => {
  if (!arr.length) return
  const index = isFunction(item) ? arr.findIndex(item) : arr.indexOf(item)
  if (index > -1) return arr.splice(index, 1)[0]
}

export const uniq = arr => Array.from(new Set(arr))

export const isAllUnique = (arr, key) => uniq(key == null ? arr : arr.map(item => item[key])).length === arr.length

export const expandArr = (items: Array) => {
  const arr = []
  items.forEach(item => arr.push(...isArray(item) ? expandArr(item) : [item]))
  return arr
}

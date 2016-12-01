import {isObject} from './base'
import {isArrayLike} from './array'

const pickOrOmit = (pickOrOmit, objOrArr, obj, ...args) => {
  const processed = objOrArr ? {} : []

  if (obj == null) return processed

  if (args.length === 1 && isArrayLike(args[0])) {
    args = Array.from(args[0])
  }

  for (const [key, value] of Object.entries(obj)) {
    const includes = args.includes(key) || args.includes(+key)
    if (pickOrOmit ? includes : !includes) {
      objOrArr ? (processed[key] = value) : processed.push(value)
    }
  }

  return processed
}

export const pickObj = (...args) => {
  return pickOrOmit(true, true, ...args)
}

export const omitObj = (...args) => {
  return pickOrOmit(false, true, ...args)
}

export const pickArr = (...args) => {
  return pickOrOmit(true, false, ...args)
}

export const omitArr = (...args) => {
  return pickOrOmit(false, false, ...args)
}

export const each = (collection, iteratee: Function, context) => {
  iteratee = context ? iteratee.bind(context) : iteratee
  if (isArrayLike(collection)) [].forEach.call(collection, iteratee)
  else if (isObject(collection)) {
    for (const [key, value] of Object.entries(collection)) {
      iteratee(value, key, collection)
    }
  } else each([collection], iteratee, context)
  return this
}

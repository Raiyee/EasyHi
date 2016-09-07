import {isArrayLike} from './array'

const pickOrOmit = (pickOrOmit, objOrArr, obj, ...args) => {
  if (obj == null) return {}

  if (args.length === 1 && isArrayLike(args[0])) {
    args = Array.from(args[0])
  }

  const processed = objOrArr ? {} : []

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

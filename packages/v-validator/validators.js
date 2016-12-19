import {MOBILE_REGEX} from 'utils'

export const length = len => function (val, model) {
  maxLength(len).call(this, val, model)
  return !!val && val.length === len
}

export const minLength = min => val => !!val && val.length >= min

export const maxLength = max => function (val, model) {
  if (!val) return false
  const valid = val.length <= max
  if (!valid && model) this[model] = this[model].toString().substr(0, max)
  return valid
}

export const mobile = flag => function (val, model) {
  maxLength(11).call(this, val, model)
  return !!flag === MOBILE_REGEX.test(val)
}

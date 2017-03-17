import {MOBILE_REGEX, isNumber} from 'utils'

export const length = len => function (val, model) {
  maxLength(len).call(this, val, model)
  val = this[model]
  return !!val && val.toString().length === len
}

export const minLength = min => val => !!val && val.length >= min

export const maxLength = max => function (val, model) {
  if (val == null) return false
  val = val.toString()
  if (val.length > max) this[model] = this[model].toString().substr(0, max)
  return true
}

export const mobile = flag => function (val, model) {
  maxLength(11).call(this, val, model)
  return !!flag === MOBILE_REGEX.test(this[model])
}

export const integer = (len, transform = true) => function (val, model) {
  const flag = !!len
  let valid = true
  if (isNumber(len)) valid = length(len).call(this, val, model)
  val = (this[model] || '').toString().replace(/[^\d]/g, '')
  val = val === '' ? '' : transform ? +val : val
  return valid && flag === /\d+/.test(this[model] = val)
}

export const min = num => val => val >= num

export const max = num => val => val <= num

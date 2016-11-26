import {trueTypeFunc} from './base'

const isNumberFunc = trueTypeFunc('Number')
const isNaNFunc = window.isNaN

export const MAX_SAFE_INTEGER = 9007199254740991

/**
 * 判断是否是 NaN, 与原生 isNaN 不同, 例如 String 类型传入为 false
 *
 * @param value       验证值
 * @returns {boolean} 是否是 NaN 值
 */
export const isNaN = value => isNumberFunc(value) && isNaNFunc(value)

/**
 * 判断是否是数字, 不包括 NaN 值
 *
 * @param value       验证值
 * @returns {boolean} 是否是纯数字
 */
export const isNumber = value => isNumberFunc(value) && !isNaNFunc(value)

export const toNum = numText => {
  numText = (numText || '').toString()
  const isNegative = numText.indexOf('-') === 0

  numText = numText.replace(/[^\d.]/g, '')
  const pointIndex = numText.indexOf('.')
  numText = numText.replace(/\./g, '')

  if (pointIndex !== -1) {
    const arr = numText.split('')
    arr.splice(pointIndex, 0, '.')
    numText = arr.join('')
  }

  return +(numText && isNegative ? `-${numText}` : numText)
}

export const isLength = value => isNumber(value) && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER

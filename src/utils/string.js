import {isUndefined, isArray} from './base'

export const hide = (mobile = '', start = 3, len = 4) =>
  mobile.toString().replace(new RegExp(`^(\\d{${start}})(\\d{${len}})`), `$1${'*'.repeat(len)}`)

export const reverse = str => str && str.split('').reverse().join('')

export const isBlankStr = str => /^\s*$/.test(str)

export const isEmptyStr = str => str === ''

export const upperCase = str => {
  if (!str) return str
  str = str.toString()
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const leftPad = (str, num, ch) => {
  str = str.toString()

  if (isUndefined(num)) return str

  if (ch === 0) {
    ch = '0'
  } else if (ch) {
    ch = ch.toString()
  } else {
    ch = ' '
  }

  return ch.repeat(num - str.length) + str
}

export const normalizeLineBreaks = str => str.replace('\n', '<br>')

export const parseTemp = (template: string, placeholder: string, param: string | Array<string>, ...args) => {
  const params: Array<string> = isArray(param) ? param : [param, ...args]
  let index = 0
  return template.replace(new RegExp(`(${placeholder})`, 'g'), () => params[index++] || '')
}

export const parseUrlTemp = (template, ...args) => parseTemp(template, '{}', args.map(encodeURIComponent))

export const defaultEmpty = (condition, str = condition) => condition ? str : ''

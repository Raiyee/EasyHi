import {isObject, isWindow} from './base'
import {each} from './common'

const domEach = (el, ...args) => each(isWindow(el) ? [el] : el, ...args)

const classRegExp = className => new RegExp(`(^|\\s+)${className.toString().trim()}(\\s+|$)`, 'g')

export const hasClass = (el, className) => classRegExp(className).test(el.className)

export const addClass = function (el, className) {
  domEach(el, el => {
    let classNames = className.split(' ')
    classNames.length > 1 ? each(classNames, className => addClass(el, className))
      : hasClass(el, className) || (el.className = `${el.className} ${className}`.trim())
  })
  return this
}

export const removeClass = function (el, className) {
  domEach(el, el => (el.className = el.className.replace(classRegExp(className), ' ').trim()))
  return this
}

const abs = Math.abs

// TODO 暂时只能处理 scrollTop 和 scrollLeft，后期考虑增加处理 css 属性，如 height、width 等
// 但实际上 css 属性动画都可以用 transition 替代，所以没有特别的意义…… 之后看具体需求实现
export const animate = (() => {
  const DEFAULT_OPTIONS = {
    duration: 500,
    value: 0
  }

  return function (el, type, options) {
    domEach(el, el => {
      // 如果只有两个参数且第二个参数是对象时，将 type 视为 options，且 type 包含在 options 对象中
      if (arguments.length === 2 && isObject(type)) {
        options = type
        type = options.type
      }

      // options 存在且不是对象时视为设置的 value
      options != null && !isObject(options) && (options = {value: options})

      const {callback, duration, value} = Object.assign({}, DEFAULT_OPTIONS, options)

      let origin = el[type]
      let requestId
      const step = 1000 * (value - origin) / duration / 60
      const animation = () => {
        if (abs(value - origin) <= abs(step / 2)) {
          return cancelAnimationFrame(requestId) || callback && callback()
        }
        el[type] = origin += step
        requestId = requestAnimationFrame(animation)
      }
      requestId = requestAnimationFrame(animation)
    })
    return this
  }
})()

export const on = function (el, events, handler, useCapture = false) {
  domEach(el, el => events.trim().split(' ').forEach(event => el.addEventListener(event, handler, useCapture)))
  return this
}

export const off = function (el, events, handler, useCapture = false) {
  domEach(el, el => events.trim().split(' ').forEach(event => el.removeEventListener(event, handler, useCapture)))
  return this
}

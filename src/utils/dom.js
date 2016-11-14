import {isArray, isObject} from './base'

const classRegExp = className => new RegExp(`(^|\\s+)${className.toString().trim()}(\\s+|$)`, 'g')

export const hasClass = (el, className) => classRegExp(className).test(el.className)

export const addClass = function (el, className) {
  hasClass(el, className) || (el.className = `${el.className} ${className}`.trim())
  return this
}

export const removeClass = function (el, className) {
  el.className = el.className.replace(classRegExp(className), ' ').trim()
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
    // 如果第一个参数 el 是数组，则循环调用
    if (isArray(el)) return el.forEach(el => animate(el, type, options))

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
  }
})()

export const on = function (el, events, handler, useCapture = false) {
  events.trim().split(' ').forEach(event => el.addEventListener(event, handler, useCapture))
  return this
}

export const off = function (el, events, handler, useCapture = false) {
  events.trim().split(' ').forEach(event => el.removeEventListener(event, handler, useCapture))
  return this
}

export function translate(el, x, y, z) {
  let args
  if (arguments.length === 2 && x !== null && isObject(x) && (args = x)) {
    x = args.x
    y = args.y
    z = args.z
  }

  const translate = getTranslate3d(el)

  x == null && (x = translate.x)
  y == null && (y = translate.y)
  z == null && (z = translate.z)

  el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`

  return this
}

export const getTranslate = el => {
  const matrix = getComputedStyle(el).transform

  if (!matrix.indexOf('matrix3d')) {
    const {x, y} = getTranslate3d(el)
    return {x, y}
  } else if (matrix.indexOf('matrix') === -1) return {x: 0, y: 0}

  const matrixArr = matrix.substring(7, matrix.length - 1).split(',')
  return {
    x: +matrixArr[4],
    y: +matrixArr[5]
  }
}

export const getTranslate3d = el => {
  const matrix = getComputedStyle(el).transform

  if (matrix.indexOf('matrix3d') === -1) {
    return {
      ...getTranslate(el),
      z: 0
    }
  }

  const matrixArr = matrix.substring(9, matrix.length - 1).split(/, */)
  return {
    x: +matrixArr[12],
    y: +matrixArr[13],
    z: +matrixArr[14]
  }
}

import {isArray, isObject, isWindow} from './base'

import {each} from './common'

export const inBrowser = typeof window !== 'undefined' && isWindow(window)

export const domEach = (el, ...args) => each(isArray(el) || el instanceof NodeList ? el : [el], ...args)

const classRegExp = className => new RegExp(`(^|\\s+)${className.toString().trim()}(\\s+|$)`, 'g')

export const hasClass = (el, className) => classRegExp(className).test(el.className)

export const addClass = (el, className) => domEach(el, el => {
  const classNames = className.split(' ')
  classNames.length > 1 ? each(classNames, className => addClass(el, className))
    : hasClass(el, className) || (el.className = `${el.className} ${className}`.trim())
})

export const removeClass = (el, className) =>
  domEach(el, el => (el.className = el.className.replace(classRegExp(className), ' ').trim()))

const abs = Math.abs

// TODO 暂时只能处理 scrollTop 和 scrollLeft，后期考虑增加处理 css 属性，如 height、width 等
// 但实际上 css 属性动画都可以用 transition 替代，所以没有特别的意义…… 之后看具体需求实现
export const animate = (() => {
  const DEFAULT_OPTIONS = {
    duration: 500,
    value: 0
  }

  return (el, type, options) => domEach(el, el => {
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
})()

function testSupportsPassive() {
  if (!inBrowser) return
  let support = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function () {
        support = true
      }
    })
    window.addEventListener('test', null, opts)
  } catch (e) {
  }
  return support
}

const EVENT_OPTIONS = testSupportsPassive() && {passive: false}

export const on = (el, events, handler, options = EVENT_OPTIONS) => {
  if (isObject(events)) return each(events, (value, key) => on(el, key, value, handler))
  domEach(el, el => events.trim().split(' ').forEach(event => el.addEventListener(event, handler, options)))
}

export const off = (el, events, handler, options = EVENT_OPTIONS) => {
  if (isObject(events)) return each(events, (value, key) => off(el, key, value, handler))
  domEach(el, el => events.trim().split(' ').forEach(event => el.removeEventListener(event, handler, options)))
}

export const one = (el, events, handler, options = EVENT_OPTIONS) => {
  const wrapper = function () {
    off(el, events, wrapper, options)
    handler.apply(this, arguments)
  }
  on(el, events, wrapper, options)
}

/**
 * 用于处理事件可能不触发的情况，或者考虑事件兼容性问题
 *
 * @param el              触发事件的元素，可以是个单个元素、数组、类数组对象
 * @param events          触发的事件，以空格区分不同事件
 * @param handler         事件处理器，正常处理时无区别，超时处理时回调第一个参数为 false，第二个参数为触发的单个元素
 * @param timeout         事件未触发的时间限制，一般比预期事件处理多 100 毫秒以等待预期事件处理
 * @returns {ensure}      主要用于修复 animationend 及 transitionend 事件等未按预期触发的情况
 */
export const ensure = (el, events, handler, timeout = 600) => domEach(el, el => {
  let end

  const wrapper = function () {
    off(el, events, wrapper)
    end = true
    handler.apply(this, arguments)
  }

  on(el, events, wrapper)

  setTimeout(() => {
    off(el, events, wrapper)
    end || handler(false, el)
  }, timeout)
})

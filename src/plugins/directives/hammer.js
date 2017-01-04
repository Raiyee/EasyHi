import Hammer from 'hammerjs'

const vueHammer = {}

const gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe']
const directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all']
const customEvents = {}

if (!Hammer) {
  throw new Error('[vue-hammer] cannot locate Hammer.js.')
}

// exposed global options
vueHammer.config = {}

function update(el, binding) {
  const fn = binding.value
  const cache = el.__vueHammer__
  const mc = cache.mc
  const handlers = cache.eventHandlers
  const event = binding.arg

  // teardown old handler if there's a new one
  const oldHandler = handlers[event]
  if (oldHandler && oldHandler !== fn) {
    mc.off(event, oldHandler)
    handlers[event] = null
  }
  // if there's a new handler, add it
  if (oldHandler !== fn) {
    if (typeof fn === 'function') {
      mc.on(event, (handlers[event] = fn))
    } else {
      handlers[event] = null
      console.warn(
        '[vue-hammer] invalid handler function for v-hammer: ' +
        this.arg + '="' + fn
      )
    }
  }
}

/**
 * Register a custom event.
 *
 * @param {String} event
 * @param {Object} options - a Hammer.js recognizer option object.
 *                           required fields:
 *                           - type: the base recognizer to use for this event
 */

vueHammer.registerCustomEvent = function (event, options) {
  options.event = event
  customEvents[event] = options
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function guardDirections(options) {
  const dir = options.direction
  if (typeof dir === 'string') {
    const hammerDirection = 'DIRECTION_' + dir.toUpperCase()
    if (directions.indexOf(dir) > -1 && Hammer.hasOwnProperty(hammerDirection)) {
      options.direction = Hammer[hammerDirection]
    } else {
      console.warn('[vue-hammer] invalid direction: ' + dir)
    }
  }
}

export default {
  bind(el, binding) {
    // setup cache object for manager instance and
    // instances and handler functions
    if (!el.__vueHammer__) {
      el.__vueHammer__ = {
        mc: new Hammer.Manager(el),
        eventHandlers: {}
      }
    }
    const cache = el.__vueHammer__
    const mc = cache.mc

    // determine event type
    const event = binding.arg
    if (!event) {
      console.warn('[vue-hammer] event type argument is required.')
    }
    let recognizerType, recognizer

    if (customEvents[event]) {
      // custom event
      const custom = customEvents[event]
      recognizerType = custom.type
      recognizer = new Hammer[capitalize(recognizerType)](custom)
      recognizer.recognizeWith(mc.recognizers)
      mc.add(recognizer)
    } else {
      // built-in event
      for (let i = 0; i < gestures.length; i++) {
        if (event.indexOf(gestures[i]) === 0) {
          recognizerType = gestures[i]
          break
        }
      }
      if (!recognizerType) {
        console.warn('[vue-hammer] invalid event type: ' + event)
        return
      }
      recognizer = mc.get(recognizerType)
      if (!recognizer) {
        // add recognizer
        recognizer = new Hammer[capitalize(recognizerType)]()
        // make sure multiple recognizers work together...
        recognizer.recognizeWith(mc.recognizers)
        mc.add(recognizer)
      }
      // apply global options
      const globalOptions = vueHammer.config[recognizerType]
      if (globalOptions) {
        guardDirections(globalOptions)
        recognizer.set(globalOptions)
      }
    }
    update(el, binding)
  },
  update,
  unbind(el, binding) {
    const cache = el.__vueHammer__
    const mc = cache.mc
    const handlers = cache.eventHandlers

    // tear down old handler
    const event = binding.arg
    const oldHandler = handlers[event]
    if (oldHandler) {
      mc.off(binding.arg, oldHandler)
      handlers[event] = null
    }

    // if no more handlers left, destroy the hammer manager instance
    const allHandlersGone = Object.keys(mc.handlers).every(function (key) {
      return mc.handlers[key].length === 0
    })
    if (allHandlersGone) {
      mc.destroy()
      // cache.mc = null // do i need to do that?
      el.__vueHammer__ = null
    }
  }
}

import {on, off, remove} from 'utils'

const inBrowser = typeof window !== 'undefined'

export default (Vue, Options = {}) => {
  const isVueNext = Vue.version.split('.')[0] === '2'
  const DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  const ListenEvents = Options.listenEvents ||
    ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']

  const $lazy = {
    listeners: {
      loading: [],
      loaded: [],
      error: []
    },
    $on(event, func) {
      this.listeners[event].push(func)
    },
    $once(event, func) {
      const vm = this

      function on() {
        vm.$off(event, on)
        func.apply(vm, arguments)
      }

      this.$on(event, on)
    },
    $off(event, func) {
      if (!func) return (this.listeners[event] = [])
      remove(this.listeners[event], func)
    },
    $emit(event, context) {
      this.listeners[event].forEach(func => func(context))
    }
  }

  const Init = {
    preLoad: Options.preLoad || 1.3,
    error: Options.error || DEFAULT_URL,
    loading: Options.loading || DEFAULT_URL,
    attempt: Options.attempt || 3,
    scale: Options.scale || inBrowser ? window.devicePixelRatio : 1,
    hasbind: false
  }

  const Listeners = []
  const imageCache = []

  const throttle = function (action, delay) {
    let timeout = null
    let lastRun = 0

    return function () {
      if (timeout) return

      const runCallback = () => {
        lastRun = Date.now()
        timeout = false
        action.apply(this, arguments)
      }

      if (Date.now() - lastRun >= delay) {
        runCallback()
      } else {
        timeout = setTimeout(runCallback, delay)
      }
    }
  }

  const lazyLoadHandler = throttle(() => {
    Listeners.forEach(listener => checkCanShow(listener))
  }, 300)

  const onListen = (el, start) => {
    if (!start) Init.hasbind = false
    ListenEvents.forEach(evt => (start ? on : off)(el, evt, lazyLoadHandler))
  }

  const checkCanShow = listener => {
    if (imageCache.indexOf(listener.src) !== -1)
      return setElRender(listener.el, listener.bindType, listener.src, 'loaded')

    let rect = listener.el.getBoundingClientRect()
    let preLoad = Init.preLoad

    rect.top < window.innerHeight * preLoad && rect.bottom > 0 &&
    rect.left < window.innerWidth * preLoad && rect.right > 0 && render(listener)
  }

  const setState = (el, state, context) => {
    el.setAttribute('lazy', state)
    context && $lazy.$emit(state, context)
  }

  const setElRender = (el, bindType, src, state, context) => {
    if (bindType) {
      el.style[bindType] = `url(${src})`
      return setState(el, state, context)
    }

    el.setAttribute('src', src)
    on(el, 'load', () => {
      setState(el, state, context)
    })
  }

  const render = item => {
    if (item.attempt >= Init.attempt) return false
    item.attempt++

    if (imageCache.indexOf(item.src) !== -1) return setElRender(item.el, item.bindType, item.src, 'loaded')
    imageCache.push(item.src)

    loadImageAsync(item => {
      setElRender(item.el, item.bindType, item.src, 'loaded', item)
      remove(Listeners, item)
    }, () => {
      remove(imageCache, item.src)
      setElRender(item.el, item.bindType, item.error, 'error', item)
    })
  }

  const loadImageAsync = (item, resolve, reject) => {
    let image = new Image()

    on(image, 'load', () => {
      resolve({
        naturalHeight: image.naturalHeight,
        naturalWidth: image.naturalWidth,
        src: item.src
      })
    })

    on(image, 'error', reject)

    image.src = item.src
  }

  const componentWillUnmount = el => {
    if (!el) return

    for (let i = 0, len = Listeners.length; i < len; i++) {
      Listeners[i] && Listeners[i].el === el && Listeners.splice(i, 1)
    }

    Init.hasbind && !Listeners.length && onListen(window, false)
  }

  const checkElExist = el => {
    let hasIt = Listeners.some(item => item.el === el)

    if (!hasIt) return

    return Vue.nextTick(lazyLoadHandler)
  }

  const addListener = (el, binding) => {
    if (el.getAttribute('lazy') === 'loaded') return
    if (checkElExist(el)) return

    let parentEl = null
    let imageSrc = binding.value
    let imageLoading = Init.loading
    let imageError = Init.error

    if (binding.value && typeof (binding.value) !== 'string') {
      imageSrc = binding.value.src
      imageLoading = binding.value.loading || Init.loading
      imageError = binding.value.error || Init.error
    }

    if (imageCache.indexOf(imageSrc) > -1) return setElRender(el, binding.arg, imageSrc, 'loaded')

    Vue.nextTick(() => {
      if (binding.modifiers) {
        parentEl = window.document.getElementById(Object.keys(binding.modifiers)[0])
      }

      let listener = {
        bindType: binding.arg,
        attempt: 0,
        parentEl: parentEl,
        el: el,
        error: imageError,
        src: imageSrc
      }

      Listeners.push(listener)

      setElRender(el, binding.arg, imageLoading, 'loading', listener)

      lazyLoadHandler()

      if (Listeners.length > 0 && !Init.hasbind) {
        Init.hasbind = true
        onListen(window, true)

        if (parentEl) {
          onListen(parentEl, true)
        }
      }
    })
  }

  Object.assign(Vue.prototype, '$lazy', {
    value: $lazy,
    readable: true,
    writable: __DEV__
  })

  Vue.directive('lazy', isVueNext ? {
    bind: addListener,
    update: addListener,
    inserted: addListener,
    componentUpdated: lazyLoadHandler,
    unbind: componentWillUnmount
  } : {
    bind: lazyLoadHandler,
    update(newValue, oldValue) {
      addListener(this.el, {
        modifiers: this.modifiers,
        arg: this.arg,
        value: newValue,
        oldValue: oldValue
      })
    },
    unbind() {
      componentWillUnmount(this.el)
    }
  })
}

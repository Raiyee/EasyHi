import {loadImageAsync} from './util'

const imageCache = {}

export default class ReactiveListener {
  constructor({el, src, error, loading, bindType, $parent, options, elRenderer}) {
    this.el = el
    this.src = src
    this.error = error
    this.loading = loading
    this.bindType = bindType
    this.attempt = 0

    this.naturalHeight = 0
    this.naturalWidth = 0

    this.options = options

    this.initState()

    this.performanceData = {
      init: Date.now(),
      loadStart: null,
      loadEnd: null
    }

    this.rect = el.getBoundingClientRect()

    this.$parent = $parent
    this.elRenderer = elRenderer
  }

  initState() {
    this.state = {
      error: false,
      loaded: false,
      rendered: false
    }
  }

  record(event) {
    this.performanceData[event] = Date.now()
  }

  update({src, loading, error}) {
    this.src = src
    this.loading = loading
    this.error = error
    this.attempt = 0
    this.initState()
  }

  getRect() {
    this.rect = this.el.getBoundingClientRect()
  }

  checkInView() {
    this.getRect()
    return (this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > 0) &&
      (this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0)
  }

  load() {
    if ((this.attempt > this.options.attempt - 1) && this.state.error) {
      if (!this.options.silent) console.log('error end')
      return
    }

    if (this.state.loaded || imageCache[this.src]) {
      return this.render('loaded', true)
    }

    this.render('loading', false)

    this.attempt++

    this.record('loadStart')

    loadImageAsync({
      src: this.src
    }, data => {
      this.src = data.src
      this.naturalHeight = data.naturalHeight
      this.naturalWidth = data.naturalWidth
      this.state.loaded = true
      this.state.error = false
      this.record('loadEnd')
      this.render('loaded', false)
      imageCache[this.src] = 1
    }, () => {
      this.state.error = true
      this.state.loaded = false
      this.render('error', false)
    })
  }

  render(state, cache) {
    this.elRenderer(this, state, cache)
  }

  performance() {
    let state = 'loading'
    let time = 0

    if (this.state.loaded) {
      state = 'loaded'
      time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1000
    }

    if (this.state.error) state = 'error'

    return {
      src: this.src,
      state,
      time
    }
  }

  destroy() {
    this.el = null
    this.src = null
    this.error = null
    this.loading = null
    this.bindType = null
    this.attempt = 0
  }
}

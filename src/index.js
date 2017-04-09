import 'styles/bootstrap'
import 'styles/app'

import Vue from 'vue'

import 'plugins'

import store, {dispatch, getters} from 'store'
import router from 'router'
import App from 'views/App'

import utils, {on, throttle} from 'utils'

Object.defineProperty(Vue.prototype, '$util', {
  value: utils,
  readable: true,
  writable: __DEV__
})

const {documentElement: docEl} = document

const resize = () => {
  const winHeight = docEl.clientHeight
  store.dispatch('setSize', {winHeight, winWidth: docEl.clientWidth})
  docEl.style.fontSize = store.getters.fontSize + 'px'
}

on(window, {
  resize: throttle(resize),
  click: () => getters.menuOpen && dispatch('toggleMenuOpen', false)
})

resize()

if (!__PROD__) {
  utils.logout = () => {
    store.dispatch('resetRole')
    location.reload()
  }
}

if (module.hot) module.hot.accept()

// eslint-disable-next-line no-new
new Vue({
  ...App,
  el: '#app',
  store,
  router
})

location.protocol === 'https:' && navigator.serviceWorker && navigator.serviceWorker.register('/service-worker.js')

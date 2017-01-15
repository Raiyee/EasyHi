import Vue from 'vue'

import 'plugins'

import store, {dispatch, getters} from 'store'
import router from 'router'
import App from 'views/App'

import utils, {deleteItem, on, throttle} from 'utils'

Object.defineProperty(Vue.prototype, '$util', {
  value: utils,
  readable: true,
  writable: __DEV__
})

const {documentElement: docEl, body} = document

const resize = () => {
  const winHeight = docEl.clientHeight
  store.dispatch('setSize', {winHeight, winWidth: docEl.clientWidth})
  docEl.style.fontSize = store.getters.fontSize + 'px'
  body.style.height = winHeight + 'px'
}

on(window, 'resize', throttle(resize, 300))
on(document, 'click', () => getters.menuOpen && dispatch('toggleMenuOpen', false))

resize()

utils.logout = () => {
  store.dispatch('resetRole')
  __MOCK__ && deleteItem('mobile')
  location.reload()
}

if (module.hot) module.hot.accept()

// eslint-disable-next-line no-new
new Vue({
  ...App,
  el: '#app',
  store,
  router
})

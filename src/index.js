import Vue from 'vue'

import 'plugins'

import store from 'store'
import router from 'router'
import App from 'views/App'

import utils, {deleteItem, on, throttle} from 'utils'
import {PERMISSION} from 'store/constants'

Object.defineProperty(Vue.prototype, '$util', {
  value: utils,
  readable: true,
  writable: __DEV__
})

import 'styles/bootstrap'
import 'styles/app'

const {documentElement: docEl, body} = document

const resize = () => {
  const winHeight = docEl.clientHeight
  store.dispatch('setSize', {winHeight, winWidth: docEl.clientWidth})
  docEl.style.fontSize = store.getters.fontSize + 'px'
  body.style.height = winHeight + 'px'
}

on(window, 'resize', throttle(resize, 300))

resize()

utils.logout = () => {
  store.dispatch('setEnv', {authorized: false, mobile: null})
  store.dispatch('resetRole')
  deleteItem(PERMISSION)
  location.reload()
}

module.hot && module.hot.accept()

// eslint-disable-next-line no-new
new Vue({
  ...App,
  el: '#app',
  store,
  router
})

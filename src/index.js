import Vue from 'vue'

import 'plugins'

import store from 'store'
import router from 'router'
import App from 'views/App'

import utils, {deleteItem, on} from 'utils'
import {PERMISSION} from 'store/constants'

Object.defineProperty(Vue.prototype, '$util', {
  value: utils,
  readable: true,
  writable: __DEV__
})

import 'styles/bootstrap'
import 'styles/app'

const theme = ['blue', 'green', 'purple', 'red'][~~(Math.random() * 4)]

System.import('styles/theme-' + theme)

const docEl = document.documentElement
const resize = () => {
  store.dispatch('setSize', {winHeight: docEl.clientHeight, winWidth: docEl.clientWidth})
  docEl.style.fontSize = store.getters.fontSize + 'px'
}

let resizeTimeoutId

on(window, 'resize', () => {
  clearTimeout(resizeTimeoutId)
  resizeTimeoutId = setTimeout(resize, 300)
})

resize()

// 暂时添加一个退出登录的钩子
window._logout_ = () => {
  store.dispatch('setEnv', {authorized: false, mobile: null})
  store.dispatch('resetRole')
  deleteItem(PERMISSION)
  location.reload()
}

module.hot && module.hot.accept()

/* eslint no-new: 0 */
new Vue({
  ...App,
  el: '#app',
  store,
  router
})

import Vue from 'vue'

import 'plugins'

import store from 'store'
import router from 'router'
import App from 'views/App'

module.hot && module.hot.accept()

/* eslint no-new: 0 */
new Vue({
  extends: App,
  el: '#app',
  store,
  router
})

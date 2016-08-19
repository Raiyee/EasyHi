import Vue from 'vue';

import store from 'store';
import router from 'router';
import App from './App';

import 'bootstrap/less/bootstrap.less';
import 'styles/app.stylus';

const documentEl = document.documentElement;
let resize, height, width;

addEventListener('resize', resize = () => {
  height = documentEl.clientHeight;
  width = documentEl.clientWidth;
  documentEl.style.fontSize = Math.min(width, 375) / 375 * 16 + 'px';
  store.dispatch('setSize', {height, width});
}, false);

resize();

module.hot && module.hot.accept();

Vue.config.debug = __DEV__;

/* eslint no-new: 0 */
new Vue({
  el: '#app',
  store,
  router,
  ...App
});

import Vue from 'vue';
import router from 'router';
import 'bootstrap/less/bootstrap.less';

import store from 'store';

const documentEl = document.documentElement;
documentEl.style.fontSize = Math.min(documentEl.clientWidth, 375) / 375 * 16 + 'px';

module.hot && module.hot.accept();

Vue.config.debug = __DEV__;

/* eslint no-new: 0 */
new Vue({
  el: '#app',
  store,
  router
});

import Vue from 'vue';

import store from 'store';
import router from 'router';
import App from 'views/App';

module.hot && module.hot.accept();

Vue.config.debug = __DEV__;

/* eslint no-new: 0 */
new Vue({
  el: '#app',
  store,
  router,
  ...App
});

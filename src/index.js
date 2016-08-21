import Vue from 'vue';

import store from 'store';
import router from 'router';
import App from 'views/App';

import 'ajax';

module.hot && module.hot.accept();

// TODO should inject mock in specific environment or when using argument `mock`
require('mock');

/* eslint no-new: 0 */
new Vue({
  el: '#app',
  store,
  router,
  ...App
});

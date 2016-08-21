import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import store from 'store';
import router from 'router';
import App from 'views/App';

module.hot && module.hot.accept();

__DEV__ && require('mock');

/* eslint no-new: 0 */
new Vue({
  el: '#app',
  store,
  router,
  ...App
});

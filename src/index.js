import Vue from 'vue';
import VueTouch from 'vue-touch';

Vue.use(VueTouch);

import filters from 'filters';

for (const [key, value] of Object.entries(filters)) {
  Vue.filter(key, value);
}

import store from 'store';
import router from 'router';
import App from 'views/App';

import 'http/ajax';

// TODO should inject mock or vconsole in specific environment or when using argument `mock`
import 'http/mock';

__DEV__ || require('vconsole');

module.hot && module.hot.accept();

/* eslint no-new: 0 */
new Vue({
  el: '#app',
  store,
  router,
  ...App
});

import Vue from 'vue';
import VueRouter from 'vue-router';

import store from 'store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['views/MemberIndex'], resolve)
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['views/Login'], resolve)
    }, {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((route, redirect, next) => {
  store.dispatch('setProgress', 50);
  if (route.matched.some(m => m.meta.auth) && !store.getters.authorized) {
    redirect('/');
  } else {
    next();
  }
});

router.afterEach((/* route, redirect, next */) => {
  store.dispatch('setProgress', 100);
  window.scrollTo(0, 0);
});

export default router;

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
      path: '/member-center',
      name: 'memberCenter',
      component: resolve => require(['views/MemberCenter'], resolve),
      meta: {
        auth: true
      }
    },
    {
      path: '/website',
      name: 'website',
      component: {
        template:"<div>这是微官网</div>"
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((route, redirect, next) => {
  store.dispatch('setProgress', 50);
  if (route.matched.some(m => m.meta.auth) && !store.getters.authorized) {
    redirect({name: 'login', query: {from: route.name}});
  } else {
    next();
  }
});

router.afterEach((/* route, redirect, next */) => {
  store.dispatch('setProgress', 100);
  window.scrollTo(0, 0);
});

export default router;

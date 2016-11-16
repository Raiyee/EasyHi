import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [{
    path: '/',
    component: __SERVER__ ? require('views/Home') : () => System.import('views/Home')
  }]
})

const theme = ['blue', 'green', 'purple', 'red'][~~(Math.random() * 4)]
System.import('styles/theme-' + theme)

import 'styles/bootstrap'
import 'styles/app'

import Vue from 'vue'
import {app, router, store} from './app'

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
// Get matched components by route and load them
const path = getLocation(router.options.base)
const resolveComponents = flatMapComponents(router.match(path), (Component, _, match, key) => {
  if (typeof Component === 'function' && !Component.options) {
    return new Promise(function (resolve, reject) {
      const _resolve = (Component) => {
        match.components[key] = Component
        resolve(Component)
      }
      var res = Component(_resolve, reject)
      if (res && res.then) {
        res.then(_resolve).catch(reject)
      }
    })
  }
  return Component
})

Promise.all(resolveComponents)
  .then(() => {
    const _app = new Vue(app)
    // prime the store with server-initialized state.
    // the state is determined during SSR and inlined in the page markup.
    store.replaceState(window.__INITIAL_STATE__)
    _app.$mount('#app')
  })
  .catch((err) => {
    console.error('Cannot load components', err)
  })

// Imported for vue-router
export function flatMapComponents(route, fn) {
  return Array.prototype.concat.apply([], route.matched.map(function (m, index) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key, index)
    })
  }))
}

// Imported from vue-router
export function getLocation(base) {
  var path = location.pathname
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + location.search + location.hash
}

// service worker
if (process.env.NODE_ENV === 'production' && location.protocol === 'https:' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}

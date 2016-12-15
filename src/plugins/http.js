import Vue from 'vue'
import HTTP, {interceptors} from 'http'

import store from 'store'
import {alert, on, warn} from 'utils'

Vue.prototype.$http = HTTP

// the `get` method is different from `post` by default, we alias it as a same-signature method here!
HTTP.get = (url, params, config) => HTTP({
  method: 'get',
  params,
  url,
  ...config
})

const setProgress = (config, progress) => config.noInterceptor || store.dispatch('setProgress', progress)

const intercept = response => Object.keys(handler).includes(+response.status)

const handler = {
  404() {
    alert('未找到匹配的 url 请求!')
  }
}

interceptors.request.use(config => setProgress(config, 50) && config)

interceptors.response.use(response => setProgress(response.config, 100) && response, error => {
  const {response} = error
  const {config} = response
  setProgress(config, 0)
  !config.noInterceptor && intercept(response) && handler[response.status]()
  return Promise.reject(response)
})

// only chrome supports this event for now
on(window, 'unhandledrejection', e => {
  const {reason} = e
  if (!reason) return warn(e)
  intercept(reason) && e.preventDefault()
})

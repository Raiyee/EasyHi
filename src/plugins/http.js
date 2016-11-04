import Vue from 'vue'
import HTTP from 'http'

import store from 'store'

Vue.prototype.$http = HTTP

// the get method is different from post default, we alias a same signature get method here!
HTTP.get = (url, data, config) => HTTP({
  method: 'get',
  data,
  url,
  ...config
})

const setProgress = (config, progress) => {
  config.__INIT__ || store.dispatch('setProgress', progress)
}

HTTP.interceptors.request.use(config => setProgress(config, 50) || config)

HTTP.interceptors.response.use(response => setProgress(response.config, 100) || response, ({response}) => {
  const {config} = response
  setProgress(config, 100)
  if (response.status === 404 && !config.__INIT__) {
    alert('未找到匹配的 url 请求!')
    return false
  }
  return Promise.reject(response)
})

import Vue from 'vue'
import HTTP, {interceptors} from 'http'

import store from 'store'

Vue.prototype.$http = HTTP

// the `get` method is different from `post` by default, we alias it as a same-signature method here!
HTTP.get = (url, data, config) => HTTP({
  method: 'get',
  data,
  url,
  ...config
})

const setProgress = (config, progress) => config.noInterceptor || store.dispatch('setProgress', progress)

interceptors.request.use(config => setProgress(config, 50) && config)

interceptors.response.use(response => setProgress(response.config, 100) && response, ({response}) => {
  const {config} = response
  setProgress(config, 0)
  if (response.status === 404 && !config.noInterceptor) {
    alert('未找到匹配的 url 请求!')
    return false
  }
  return Promise.reject(response)
})

import Vue from 'vue'
import HTTP from 'http'

Vue.prototype.$http = HTTP

// the get method is different from post default, we alias a same signature get method here!
HTTP.get = (url, data, config) => {
  return HTTP({
    method: 'get',
    data,
    url,
    ...config
  })
}

HTTP.interceptors.response.use(null, ({response}) => {
  if (response.status === 404 && !response.config.__INIT__) {
    alert('未找到匹配的 url 请求!')
    return false
  }
  return Promise.reject(response)
})

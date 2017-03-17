import Vue from 'vue'
import axios, {interceptors} from 'axios'

import store from 'store'
import utils, {alert, login, on, warn} from 'utils'

__MOCK__ || (axios.defaults.baseURL = BASE_URL)
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

Vue.prototype.$http = axios

// the `get` method is different from `post` by default, we alias it as a same-signature method here!
axios.get = (url, params, config) => axios({
  method: 'get',
  params,
  url,
  ...config
})

const setProgress = (config, progress) => config.noInterceptor || store.dispatch('setProgress', progress)

interceptors.request.use(config => setProgress(config, 50) && config)

const PERMISSION_DENIED = () => alert('您没有该资源的访问权限!')

const HANDLER = {
  401: PERMISSION_DENIED,
  404() {
    alert('未找到匹配的 url 请求!')
  },
  406() {
    utils.router.history.updateRoute(utils.NOT_FOUND_ROUTE)
  },
  418() {
    const {router} = utils
    router.replace({
      path: '/login',
      query: {from: router.currentRoute.fullPath}
    })
  },
  419: login,
  450: PERMISSION_DENIED,
  451: PERMISSION_DENIED,
  500() {
    alert('系统异常，请稍后重试！')
  }
}

interceptors.response.use(response => setProgress(response.config, 100) && response, error => {
  const {response} = error
  const {config, status} = response
  setProgress(config, 0)
  config.noInterceptor || HANDLER[status] && HANDLER[status]()
  return Promise.reject(error)
})

// only chrome supports this event for now
on(window, 'unhandledrejection', e => {
  e.preventDefault()
  e.reason && HANDLER[e.reason.status] || warn(e)
})

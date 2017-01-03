import Vue from 'vue'
import axios, {interceptors} from 'axios'

import store from 'store'
import {alert, on, warn} from 'utils'

axios.defaults.baseURL = BASE_URL

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

const HANDLER = {
  404() {
    alert('未找到匹配的 url 请求!')
  },
  419(){
    let modalId;
    modalId = Vue.prototype.$modal.open({
      id: modalId,
      component: System.import('components/HiLoginModal'),
      options: {
        backdrop: false,
        show: true,
        destroy: true,
      },
      props: {
        transition: true
      }
    })
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

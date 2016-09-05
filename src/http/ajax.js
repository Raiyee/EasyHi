import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push(function (req, next) {
  next(res => {
    if ([404].includes(res.status)) {
      alert('未找到匹配的 url 请求!')
    }
  })
})

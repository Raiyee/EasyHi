import Vue from 'vue'
import VueRouter from 'vue-router'
import HTTP from 'http'

Vue.use(VueRouter)

import store from 'store'
import routes, {base} from './routes'
import utils, {alert, isFunction} from 'utils'

const router = new VueRouter(routes)

const body = document.getElementsByTagName('body')[0]

const routeCache = {}

const resolveData = (data, meta, next) => {
  store.dispatch('setProgress', 90)

  const init = meta.init
  const actions = init.actions

  if (!actions) {
    // 未定义 actions 表示将 data 存入 meta 然后在组件初始化前通过 route 获取
    meta.data = data
  } else if (typeof actions === 'string') {
    // 完成后如果是字符串表示直接将所有数据导入 action
    store.dispatch(actions, data)
  } else {
    // 否则应该是对象类型, 遍历将对应数据导入对应 action
    for (const [key, value] of Object.entries(actions)) {
      store.dispatch(key, data[value])
    }
  }

  // 数据导入 store 成功后进入组件
  next()
}

const BG = 'bg'

const resolveRoute = (to, from, next) => {
  store.dispatch('setProgress', 50)

  const meta = to.meta
  const bg = meta.bg

  utils[`${bg == null || bg ? 'add' : 'remove'}Class`](body, BG)

  // 首先判断是否需要登录权限, 后期需要新增馆主、教练、客服等多种权限
  if (meta.auth && !store.getters.authorized) return next({name: 'login', query: {from: to.fullPath}})

  const fullPath = to.fullPath
  let init, cache

  // 如果不需要先初始化数据或者已经拉取过数据则直接进入
  if (!(init = meta.init)) return next()
  // eslint-disable-next-line no-cond-assign
  if (cache = routeCache[fullPath]) return resolveData(cache, meta, next)

  if (isFunction(init)) return init(to, from, next)

  store.dispatch('setProgress', 70)

  HTTP({
    method: init.type || 'post',
    url: init.url,
    data: {
      ...to.params,
      ...to.query
    },
    noInterceptor: true,
    ...init.options
  }).then(({data}) => {
    resolveData(data, meta, next)
    if (init.restore == null || init.restore) {
      routeCache[fullPath] = data
    }
  }).catch(() => {
    alert('系统异常，无法跳转')
    next(false)
    store.dispatch('setProgress', 0)
  })
}

router.beforeEach((to, from, next) => {
  if (store.getters.initialized || to.meta.tcode === false) return resolveRoute(to, from, next)

  store.dispatch('initialize', {
    base
  }).then(() => {
    resolveRoute(to, from, next)
  }).catch(() => {
    next('/404')
  })
})

router.afterEach(() => {
  store.dispatch('setProgress', 100)
  window.scrollTo(0, 0)
})

export default router

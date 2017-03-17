import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import {dispatch, getters} from 'store'
import routes from './routes'
import utils, {alert, changeTitle, closeModal, error, isArray, isFunction, isString, EMPTY_FUNC, TIP_ID} from 'utils'

Vue.use(VueRouter)

dispatch('parsePath', location.pathname)

routes.base = getters.base

const router = new VueRouter(routes)

const body = document.getElementsByTagName('body')[0]

const routeCache = {}

const resolveData = (data, meta, next) => {
  dispatch('setProgress', 90)

  const {init} = meta
  const actions = init.actions

  if (!actions) {
    // 未定义 actions 表示将 data 存入 meta 然后在组件初始化前通过 route 获取
    meta.data = data
  } else if (typeof actions === 'string') {
    // 完成后如果是字符串表示直接将所有数据导入 action
    dispatch(actions, data)
  } else {
    // 否则应该是对象类型, 遍历将对应数据导入对应 action
    for (const [key, value] of Object.entries(actions)) {
      dispatch(key, data[value])
    }
  }

  // 数据导入 store 成功后进入组件
  next()
}

const BG = 'bg'

const resolveRoute = async (to, from, next) => {
  closeModal() && closeModal(TIP_ID)

  dispatch('setProgress', 50)

  const {meta} = to
  const bg = meta.bg

  utils[`${bg == null || bg ? 'add' : 'remove'}Class`](body, BG)

  let {auth, init} = meta

  // 判断是否需要登录权限
  if (auth) {
    // 如果未登录直接跳转登录页
    if (!getters.authorized) {
      return next({name: 'login', query: {from: to.fullPath}})
      // 已经登录判断是否只需要校验登录，无需校验身份
    } else if (auth !== true) {
      isFunction(auth) && (auth = auth(to, from))
      // 如果需要的角色列表不是数组，变更为数组
      isArray(auth) || (auth = [auth])

      const currentRole = getters.currentRole

      // 如果需要的角色列表不包含当前角色，跳转到对应首页
      if (!auth.includes(currentRole)) return next(`/${currentRole.toLowerCase()}-index`)
    }
  }

  const {fullPath} = to

  // 如果不需要先初始化数据或者已经拉取过数据则直接进入
  if (!init) return next()

  const cache = routeCache[fullPath]
  if (cache) return resolveData(cache, meta, next)

  if (isFunction(init)) init = init(to, from)
  if (isString(init)) init = {url: init}

  let {url, params, restore, options, type} = init

  isFunction(url) && (url = url(to, from))

  dispatch('setProgress', 70)

  params = params === undefined ? {
    ...to.params,
    ...to.query
  } : params

  try {
    const {data} = await axios[type || 'post'](url, params && Object.keys(params).length ? params : null, {
      noInterceptor: true,
      ...options
    })
    resolveData(data, meta, next)
    restore && (routeCache[fullPath] = data)
  } catch (e) {
    error(e)
    alert('系统异常，无法跳转')
    next(false)
    dispatch('setProgress', 0)
  }
}

const NOT_FOUND_ROUTE = router.match('/404')

Object.assign(utils, {
  router,
  NOT_FOUND_ROUTE
})

router.beforeEach((to, from, next) => {
  if (getters.initialized) return resolveRoute(to, from, next)

  const promise = axios.post(`/center/${getters.tcode || ''}/initialize/get-base-data`)
    .then(({data}) => {
      const {error, currentRole, merchantName, theme} = data

      if (error) return router.history.updateRoute(NOT_FOUND_ROUTE)

      changeTitle(merchantName)

      if (theme.startsWith('#')) {
        import('plugins/theme').then(module => module(theme))
      } else {
        import(`styles/theme-${theme}`)
      }

      dispatch('initialize', data)

      currentRole && dispatch('resetRole', data)

      resolveRoute(to, from, next)
    })

  __TESTING__ && promise.catch(EMPTY_FUNC)
})

router.afterEach((to, from, next) => {
  dispatch('setProgress', 100)
  const {menuShow} = to.meta
  dispatch('toggleMenuShow', menuShow == null || menuShow)
  Object.assign(router.app.$el, {
    scrollTop: 0,
    scrollLeft: 0
  })
})

export default router

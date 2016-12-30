import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

import {dispatch, getters} from 'store'
import routes from './routes'
import utils, {alert, changeTitle, isArray, isFunction, pickObj} from 'utils'

dispatch('parsePath', location.pathname)

routes.base = getters.base

const router = new VueRouter(routes)

const body = document.getElementsByTagName('body')[0]

const routeCache = {}

const resolveData = (data, meta, next) => {
  dispatch('setProgress', 90)

  const init = meta.init
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

const resolveRoute = (to, from, next) => {
  dispatch('setProgress', 50)

  const meta = to.meta
  const bg = meta.bg

  utils[`${bg == null || bg ? 'add' : 'remove'}Class`](body, BG)

  let {auth} = meta

  // 判断是否需要登录权限
  if (auth) {
    // 如果未登录直接跳转登录页
    if (!getters.authorized) {
      return next({name: 'login', query: {from: to.fullPath}})
      // 已经登录判断是否只需要校验登录，无需校验身份
    } else if (auth !== true) {
      // 如果需要的角色列表不是数组，变更为数组
      isArray(auth) || (auth = [auth])

      const currentRole = getters.currentRole

      // 如果需要的角色列表不包含当前角色，跳转到对应首页
      if (!auth.includes(currentRole)) return next(`/${currentRole.toLowerCase()}-index`)
    }
  }

  const fullPath = to.fullPath
  let init, cache

  // 如果不需要先初始化数据或者已经拉取过数据则直接进入
  if (!(init = meta.init)) return next()
  // eslint-disable-next-line no-cond-assign
  if (cache = routeCache[fullPath]) return resolveData(cache, meta, next)

  if (isFunction(init)) return init(to, from, next)

  dispatch('setProgress', 70)

  axios({
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
    dispatch('setProgress', 0)
  })
}

const resolveMenu = (to, from, next) => {
  if (!to.meta) return
  let {menuShow} = to.meta

  dispatch('setMenuShow', menuShow !== false)
}

const NOT_FOUND_ROUTE = router.match('/404')

Object.assign(utils, {
  router,
  NOT_FOUND_ROUTE
})

router.beforeEach((to, from, next) => {
  dispatch('setMenuOpen', false)
  if (getters.initialized) return resolveRoute(to, from, next)

  axios.post('/initialize', pickObj(getters, 'tcode', 'mobile'))
    .then(({data: {error, coachAlias, currentRole, merchantName, roles, theme}}) => {
      if (error) return router.history.updateRoute(NOT_FOUND_ROUTE)

      changeTitle(merchantName)

      System.import(`styles/theme-${theme}`)

      dispatch('initialize', {coachAlias, merchantName})
      currentRole && dispatch('resetRole', {currentRole, roles})

      resolveRoute(to, from, next)
    })
})

router.afterEach((to, from, next) => {
  dispatch('setProgress', 100)
  resolveMenu(to, from, next)
  window.scrollTo(0, 0)
})

export default router

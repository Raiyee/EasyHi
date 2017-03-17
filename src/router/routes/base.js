import {getters} from 'store'

// import utils from 'utils'

export default [{
  path: '/',
  name: 'home',
  component: () => import('views/Home'),
  meta: {
    menuShow: false
  }
}, {
  path: '/login',
  name: 'login',
  component: () => import('views/Login'),
  meta: {
    menuShow: false,
    keepAlive: false
  }
}, {
  path: '/new-user-login/:userId(\\d+)',
  name: 'newUserLogin',
  component: () => import('views/Login/NewUser'),
  meta: {
    init: to => `/invite/initialize-invitee-data/${to.params.userId}`
  }
}, {
  path: '/404',
  name: '404',
  component: () => import('components/HiWidgets/NotFound'),
  beforeEnter() {
    location.href = getters.urlPrefix + getters.currRole + '/index'
    // utils.router.history.updateRoute(utils.NOT_FOUND_ROUTE)
  }
}]

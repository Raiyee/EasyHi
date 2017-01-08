import utils from 'utils'

export default [{
  path: '/',
  name: 'home',
  component: () => System.import('views/Home'),
  meta: {
    menuShow: false
  }
}, {
  path: '/login',
  name: 'login',
  component: () => System.import('views/Login'),
  meta: {
    menuShow: false
  }
}, {
  path: '/404',
  name: '404',
  component: () => System.import('components/NotFound'),
  beforeEnter() {
    utils.router.history.updateRoute(utils.NOT_FOUND_ROUTE)
  }
}]

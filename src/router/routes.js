import {getters} from 'store'

import utils, {ROLES} from 'utils'

// eslint-disable-next-line no-unused-vars
const {ADVISOR, COACH, MERCHANT, MEMBER, SERVICE, VISITOR} = ROLES

export default {
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: () => System.import('views/Home')
  }, {
    path: '/member-subscribe',
    component: () => System.import('views/RouterView'),
    children: [{
      path: '',
      name: 'memberSubscribe',
      component: () => System.import('views/MemberSubscribe'),
      meta: {
        init: {
          url: '/get-schedules'
        },
        keepAlive: false
      }
    }]
  }, {
    path: '/login',
    name: 'login',
    component: () => System.import('views/Login')
  }, {
    path: '/member-index',
    component: () => System.import('views/RouterView'),
    children: [{
      path: '',
      name: 'memberIndex',
      component: () => System.import('views/MemberIndex'),
      alias: '/visitor-index',
      meta: {
        auth: [MEMBER, VISITOR],
        init: {
          url: '/member-index',
          restore: false
        }
      }
    }, {
      path: '/member-info',
      name: 'memberInfo',
      component: () => System.import('views/MemberIndex/MemberInfo'),
      meta: {
        auth: MEMBER,
        init: {
          url: '/member-info'
        }
      }
    }, {
      path: '/member-message',
      name: 'memberMessage',
      component: () => System.import('views/MemberIndex/MemberMessage'),
      meta: {
        auth: MEMBER,
        init: {
          url: '/member-message'
        }
      }
    }, {
      path: '/member-subscription',
      name: 'memberSubscription',
      component: () => System.import('views/MemberIndex/MemberSubscription'),
      meta: {
        auth: MEMBER,
        init: {
          url: '/member-subscriptions'
        }
      }
    }
    ]
  }, {
    path: '/test',
    component: () => System.import('views/RouterView'),
    children: [{
      path: '/dynamic',
      name: 'dynamic',
      component: () => System.import('views/_Dynamic'),
      meta: {
        init: {
          url: '/dynamic'
        }
      }
    }, {
      path: '/chart',
      name: 'chart',
      component: () => System.import('views/_Chart')
    }, {
      path: '/picker',
      component: () => System.import('views/_Picker')
    }, {
      path: '/modal',
      component: () => System.import('views/_Modal')
    }
    ]
  }, {
    path: '/404',
    name: '404',
    component: () => System.import('views/NotFound'),
    beforeEnter() {
      if (getters.isStaff) return (location.href = getters.urlPrefix + getters.currentRole.toLowerCase() + '/index')
      utils.router.history.updateRoute(utils.NOT_FOUND_ROUTE)
    }
  }, {
    path: '*',
    redirect: '/404'
  }
  ]
}

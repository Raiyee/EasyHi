import utils, {ROLES, MENU_TYPES} from 'utils'

// eslint-disable-next-line no-unused-vars
const {ADVISOR, COACH, MERCHANT, MEMBER, SERVICE} = ROLES

// eslint-disable-next-line no-unused-vars
const {MEMBER_CLIENT, MERCHANT_CLIENT, MEMBER_SUBSCRIBE_SMALL, MEMBER_SUBSCRIBE_PRIVATE} = MENU_TYPES

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => System.import('views/MemberIndex'),
      meta: {
        menuShow: false
      }
    }, {
      path: '/login',
      name: 'login',
      menuShow: false,
      component: () => System.import('views/Login'),
      meta: {
        menuShow: false
      }
    }, {
      path: '/member-center',
      name: 'memberCenter',
      component: () => System.import('views/MemberCenter'),
      meta: {
        auth: MEMBER,
        init: {
          url: '/member-center',
          restore: false
        },
        menuType: MEMBER_CLIENT
      }
    }, {
      path: '/member-subscribe',
      name: 'memberSubscribe',
      component: () => System.import('views/MemberSubscribe'),
      meta: {
        init: {
          url: '/get-schedules'
        },
        keepAlive: false,
        menuType: MEMBER_SUBSCRIBE_SMALL
      }
    }, {
      path: '/member-information',
      name: 'memberInfo',
      component: () => System.import('views/MemberCenter/MemberInfo'),
      meta: {
        auth: MEMBER,
        init: {
          url: '/get-member-information'
        },
        menuType: MEMBER_CLIENT
      }
    }, {
      path: '/member-message',
      name: 'memberMessage',
      component: () => System.import('views/MemberCenter/MemberMessage'),
      meta: {
        auth: MEMBER,
        init: {
          url: '/membermessage'
        },
        menuType: MEMBER_CLIENT
      }
    }, {
      path: '/member-subscription',
      name: 'memberSubscription',
      component: () => System.import('views/MemberCenter/MemberSubscription'),
      meta: {
        auth: MEMBER,
        init: {
          url: '/member-subscriptions'
        },
        menuType: MEMBER_CLIENT
      }
    }, {
      path: '/dynamic',
      name: 'dynamic',
      component: () => System.import('views/_Dynamic'),
      meta: {
        init: {
          url: '/dynamic'
        },
        menuShow: false
      }
    }, {
      path: '/picker',
      component: () => System.import('views/_Picker'),
      alias: '/merchant-index',
      meta: {
        auth: MERCHANT,
        menuType: MERCHANT_CLIENT
      }
    }, {
      path: '/modal',
      component: () => System.import('views/_Modal')
    }, {
      path: '/404',
      name: '404',
      component: () => System.import('views/NotFound'),
      meta: {
        menuType: MEMBER_CLIENT
      },
      beforeEnter() {
        utils.router.history.updateRoute(utils.NOT_FOUND_ROUTE)
      }
    }, {
      path: '*',
      redirect: '/404'
    }
  ]
}

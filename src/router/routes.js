export default {
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => System.import('views/Home')
    }, {
      path: '/login',
      name: 'login',
      component: () => System.import('views/Login')
    },
    {
      path: '/member-index',
      name: 'memberIndex',
      component: () => System.import('views/MemberIndex'),
      meta: {
        auth: true,
        init: {
          url: '/member-center',
          restore: false
        }
      }
    },
    {
      path: '/member-subscribe',
      name: 'memberSubscribe',
      component: () => System.import('views/MemberSubscribe'),
      meta: {
        init: {
          url: '/get-schedules'
        },
        keepAlive: false
      }
    },
    {
      path: '/member-information',
      name: 'memberInfo',
      component: () => System.import('views/MemberIndex/MemberInfo'),
      meta: {
        auth: true,
        init: {
          url: '/get-member-information'
        }
      }
    }, {
      path: '/member-message',
      name: 'memberMessage',
      component: () => System.import('views/MemberIndex/MemberMessage'),
      meta: {
        auth: true,
        init: {
          url: '/membermessage'
        }
      }
    },
    {
      path: '/member-subscription',
      name: 'memberSubscription',
      component: () => System.import('views/MemberIndex/MemberSubscription'),
      meta: {
        auth: false,
        init: {
          url: '/member-subscriptions'
        }
      }
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: () => System.import('views/_Dynamic'),
      meta: {
        init: {
          url: '/dynamic'
        }
      }
    }, {
      path: '/modal',
      component: () => System.import('views/_Modal')
    }, {
      path: '*',
      redirect: '/'
    }
  ]
}

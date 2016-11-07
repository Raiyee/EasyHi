export default {
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => System.import('views/MemberIndex')
    }, {
      path: '/login',
      name: 'login',
      component: () => System.import('views/Login')
    }, {
      path: '/member-center',
      name: 'memberCenter',
      component: () => System.import('views/MemberCenter'),
      meta: {
        auth: true,
        init: {
          url: '/membercenter',
          restore: false
        }
      }
    }, {
      path: '/member-subscribe',
      name: 'memberSubscribe',
      component: () => System.import('views/MemberSubscribe'),
      meta: {
        init: {
          url: '/get-schedules'
        },
        keepAlive: false
      }
    }, {
      path: '/member-message',
      name: 'memberMessage',
      component: () => System.import('views/MemberCenter/MemberMessage'),
      meta: {
        auth: true,
        init: {
          url: '/membermessage'
        }
      }
    }, {
      path: '*',
      redirect: '/'
    }
  ]
}

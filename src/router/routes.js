export default {
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['views/MemberIndex'], resolve)
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['views/Login'], resolve)
    }, {
      path: '/member-center',
      name: 'memberCenter',
      component: resolve => require(['views/MemberCenter'], resolve),
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
      component: resolve => require(['views/MemberSubscribe'], resolve),
      meta: {
        init: {
          url: '/get-schedules',
          actions: {
            addStatuses: 'calendarStatus'
          }
        }
      }
    }, {
      path: '/website',
      name: 'website',
      component: resolve => require(['views/MerchantWebsite'], resolve),
      meta: {
        init: {
          url: '/get-website-edit'
        }
      }
    }, {
      path: '*',
      redirect: '/'
    }
  ]
};

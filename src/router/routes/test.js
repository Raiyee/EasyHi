export default [{
  path: '/dynamic',
  name: 'dynamic',
  component: () => import('views/_Test/Dynamic'),
  meta: {
    init: {
      url: '/dynamic'
    }
  }
}, {
  path: '/chart',
  name: 'chart',
  component: () => import('views/_Test/Chart')
}, {
  path: '/picker',
  component: () => import('views/_Test/Picker')
}, {
  path: '/modal',
  component: () => import('views/_Test/Modal')
}, {
  path: '/operator-menu',
  component: () => import('views/_Test/OperatorMenu')
}, {
  path: '/cards',
  component: () => import('views/_Test/Card'),
  meta: {
    init: '/test-cards'
  }
}, {
  path: '/vouchers',
  component: () => import('views/_Test/Voucher'),
  meta: {
    init: `/test-vouchers`
  }
}, {
  path: '/drop',
  component: () => import('views/_Test/Dropdown')
}, {
  path: '/review',
  component: () => import('views/_Test/Review'),
  meta: {
    init: '/get-reviews'
  }
}]

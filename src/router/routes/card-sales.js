import {ADMINS} from 'utils'

export default [{
  name: 'cardSales',
  path: '/card-sales',
  component: () => import('views/CardSales'),
  meta: {
    auth: ADMINS,
    init: '/card-sales/get-cards/allSellingCardForMerchant'
  }
}, {
  path: '/card-sales/sold-list/:cardId?',
  component: () => import('views/CardSales/CardSoldList')
}, {
  name: 'cardSalesCustomer',
  path: '/card-sales/customer',
  component: () => import('views/CardSales'),
  meta: {
    init: '/card-sales/get-cards/allSellingCardForMember'
  }
}, {
  name: 'cardSalesDetail',
  path: '/card-sales/detail/:cardId(\\d+)',
  component: () => import('views/CardSales/CardSalesDetail'),
  meta: {
    auth: ADMINS,
    init: to => `/card-sales/get-card-by-id/${to.params.cardId}`
  }
}, {
  name: 'cardSalesCustomerDetail',
  path: '/card-sales/customer-detail/:cardId(\\d+)',
  component: () => import('views/CardSales/CardSalesDetail'),
  meta: {
    init: to => `/card-sales/get-card-by-id/${to.params.cardId}`
  }
}, {
  name: 'payResult',
  path: '/card-sales/pay-result/:orderId(\\d+)',
  component: () => import('views/CardSales/PayResult'),
  meta: {
    init: to => `/qr-order-buyer/get-order/${to.params.orderId}`
  }
}]

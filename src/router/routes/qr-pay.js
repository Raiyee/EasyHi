export default [{
  path: '/qr-pay/start-payment/:orderId(null|\\d+)/:realMoney(\\d+\\.\\d{2})/:payComment?',
  name: 'qrPay',
  component: () => import('views/QrPay/StartPayment'),
  meta: {
    auth: true,
    init: '/qr-pay/get-useful-stored-value-card'
  }
}, {
  path: '/scan-qr-code/:userId(\\d+)',
  name: 'scanQrCode',
  component: () => import('views/MerchantCheckin/QrCodeCheckin'),
  meta: {
    auth: true,
    init: {
      url: to => `/merchant-checkin/query-member-today-schedules/${to.params.userId}`
    }
  }
}]

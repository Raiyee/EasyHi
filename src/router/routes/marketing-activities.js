import qs from 'qs'

import {ADMINS, STAFFS_S} from 'utils'

export default [{
  name: 'marketingActivities',
  path: '/marketing-activities',
  component: () => import('views/MarketingActivities'),
  meta: {
    auth: STAFFS_S,
    init: '/isst/fetch-treas-list'
  }
}, {
  name: 'allActivities',
  path: '/all-activities',
  component: () => import('views/MarketingActivities/AllActivities'),
  meta: {
    auth: STAFFS_S,
    init: '/expVoucher/activity-created-num',
    bg: false
  }
}, {
  name: 'manageVoucher',
  path: '/:type(cash|exp)-voucher',
  component: () => import('views/MarketingActivities/ManageVoucher'),
  meta: {
    auth: ADMINS,
    init: to => {
      return {
        url: to.params.type === 'cash' ? '/cash-coupon/coupon-data' : '/experience/exp-data',
        params: {init: true},
        type: 'get'
      }
    }
  }
}, {
  name: 'presentedVouchers',
  path: '/presented-vouchers',
  component: () => import('views/MarketingActivities/ManageVoucher/PresentedVouchers'),
  meta: {
    auth: ADMINS,
    init: {
      url: '/cash-coupon/coupon-list-by-date',
      params: qs.stringify({monthIndex: 0})
    }
  }
}, {
  name: 'presentedVoucher',
  path: '/presented-:type(cash|exp)-voucher/:voucherInstId(\\d+)',
  component: () => import('views/MarketingActivities/ManageVoucher/PresentedVouchers/VoucherInstDetail'),
  meta: {
    auth: ADMINS,
    init: ({params}) => ({
      url: `${(params.type === 'cash' ? `/cash-coupon/detail` : `/experience/inst-detail`)}/${params.voucherInstId}`,
      params: null
    })
  }
}, {
  name: 'voucherDetail',
  path: '/:type(cash|exp)-voucher-detail/:voucherId(\\d+)',
  component: () => import('views/MarketingActivities/ManageVoucher/VoucherDetail'),
  meta: {
    auth: ADMINS,
    init: ({params: {type, voucherId}}) => ({
      url: type === 'cash' ? `/cash-coupon/coupon-detail/${voucherId}` : `/experience/exp-detail/${voucherId}`,
      params: null
    })
  }
}]

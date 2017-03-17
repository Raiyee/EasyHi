import {mock, Random} from 'mockjs'

import {randomId, randomArr} from 'utils'

mock(/\/(cash-coupon\/coupon-data)|(experience\/exp-data)/, ({url}) => {
  return mock({
    presentedNum: url.indexOf('init') + 1 ? '@natural(0, 100)' : undefined,
    vouchers: randomArr(10).map(() => mock({
      voucherId: randomId(),
      voucherName: '@ctitle',
      voucherValue: '@float(1, 1000, 0, 2)',
      voucherTimes: '@natural(0,10)',
      voucherExpiredType: '@boolean',
      voucherExpiredLimit: '@natural(1,100)',
      voucherExpiredRange: ['@date', '@date'],
      miniConsume: url.indexOf('cash') + 1 ? '@float(0, 8000, 0, 2)' : 0,
      presentedNum: '@natural(0, 1000)'
    }))
  })
})

mock(/\/expVoucher\/query-course-list/, () => randomArr(8).map(() => ({
  courseId: randomId(),
  courseName: Random.ctitle()
})))

mock(/\/(cash-coupon\/create-cash-coupon)|(experience-voucher\/add-experience-voucher)/, () => randomId())

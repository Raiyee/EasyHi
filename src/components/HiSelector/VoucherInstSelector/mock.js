import {mock} from 'mockjs'

import {randomArr, randomId} from 'utils'

mock(/\/cash-coupon\/query-can-use-coupons/, () => randomArr(10, 1).map(() => mock({
  voucherId: randomId(),
  voucherInstId: randomId(),
  voucherName: '@ctitle',
  voucherValue: '@float(0.01, 1000, 0, 2)',
  voucherExpiredType: true,
  voucherExpiredRange: ['@date', '@date'],
  miniConsume: '@float(0.01, 1000, 0, 2)'
})))

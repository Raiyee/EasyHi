import {mock, Random} from 'mockjs'

import {randomArr, randomId} from 'utils'

mock(/\/cash-coupon\/query-personal-coupons/, () => {
  return randomArr(5).map(() => {
    const voucherType = Random.boolean()

    return mock({
      voucherName: '@ctitle',
      voucherValue: Random.float(1, 1000, 0, 2),
      voucherTimes: '@natural(0,7)',
      voucherInstId: randomId(),
      miniConsume: voucherType ? Random.float(1000, 5000, 0, 2) : undefined,
      voucherExpiredRange: [Random.date(), Random.date()],
      usedTime: voucherType ? undefined : Random.date(),
      availableTimes: Random.natural(1, 5)
    })
  })
})

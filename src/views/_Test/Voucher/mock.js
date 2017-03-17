import {mock, Random} from 'mockjs'

import {randomArr} from 'utils'

mock(/\/test-vouchers$/, () => {
  return randomArr(5).map(() => {
    const voucherExpiredType = Random.boolean()

    return mock({
      voucherId: '@id',
      voucherName: '@ctitle',
      voucherValue: '@natural(50,200)',
      voucherTimes: '@natural(0,7)',
      voucherExpiredType,
      voucherExpiredLimit: voucherExpiredType || 'natural(1, 7)',
      voucherExpiredRange: voucherExpiredType ? [Random.date(), Random.date()] : []
    })
  })
})

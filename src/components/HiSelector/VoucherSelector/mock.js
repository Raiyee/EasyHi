import {mock, Random} from 'mockjs'

import {randomArr, randomId} from 'utils'

mock(/\/voucher\/vouchers-list/, () => {
  return randomArr(5).map(() => {
    const voucherExpiredType = Random.boolean()
    const voucherValue = Random.float(1, 1000, 0, 2)

    return mock({
      voucherId: randomId(),
      voucherName: '@ctitle',
      voucherValue,
      voucherTimes: '@natural(0,7)',
      voucherDescription: `面值${voucherValue}元, 适用于${randomArr(5, 1).map(() => Random.ctitle()).join('、')}。`,
      voucherExpiredType,
      voucherExpiredLimit: voucherExpiredType || Random.natural(1, 7),
      voucherExpiredRange: voucherExpiredType ? [Random.date(), Random.date()] : []
    })
  })
})

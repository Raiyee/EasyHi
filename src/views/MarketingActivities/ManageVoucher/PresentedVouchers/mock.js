import qs from 'qs'

import {mock, Random} from 'mockjs'

import {randomArr, randomId, randomMobile} from 'utils'

const mockVoucher = () => randomArr(20).map(() => mock({
  userName: '@cname',
  userMobile: randomMobile(),
  voucherInstId: randomId(),
  voucherName: '@ctitle',
  voucherValue: '@float(0, 100, 0, 2)',
  voucherTimes: '@natural(0, 100)',
  miniConsume: Random.boolean() ? '@float(0, 100, 0, 2)' : 0,
  receivedTime: '@datetime',
  usedTime: Random.boolean() && Random.datetime(),
  voucherExpiredRange: ['@date', '@date']
}))

mock(/\/cash-coupon\/coupon-list-by-date$/, mockVoucher)

mock(/\/cash-coupon\/coupon-list-by-date-array$/,
  ({body}) => qs.parse(body).monthIndex.reduce((prev, curr) => Object.assign(prev, {[curr]: mockVoucher()}), {}))

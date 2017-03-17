import {mock, Random} from 'mockjs'

import {randomArr, randomId, randomMobile} from 'utils'

mock(/\/(cash-coupon\/detail)|(experience\/inst-detail)\/\d+/, ({url}) => {
  // 1 活动, 2 赠送
  const sourceType = Random.pick(1, 2)

  return mock({
    userName: '@cname',
    userMobile: randomMobile(),
    voucherInstId: randomId(),
    voucherName: '@ctitle',
    voucherValue: '@float(0, 100, 0, 2)',
    voucherTimes: '@natural(0, 100, 0, 2)',
    availableTimes: '@natural(0, 100, 0, 2)',
    miniConsume: url.indexOf('cash') + 1 ? '@float(0, 100, 0, 2)' : 0,
    receivedTime: '@datetime',
    usedTime: '@datetime',
    sourceContent: sourceType - 1 ? '@cname' : '@ctitle',
    sourceType,
    sourceActivityRange: sourceType - 1 ? null : ['@date', '@date'],
    voucherExpiredRange: ['@date', '@date'],
    applicableCourses: randomArr(5).map(() => Random.cword(5, 8)),
    purchasedContent: '@ctitle'
  })
})

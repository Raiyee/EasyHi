import Mock, {Random} from 'mockjs'

import {randomId} from 'utils'

import pathToRegexp from 'path-to-regexp'

Mock.mock(/\/renew-mbrcard\/init-data\/\d+$/, ({url}) => {
  const mbrCardId = pathToRegexp('/renew-mbrcard/init-data/:mbrCardId').exec(url)[1]
  const isValueCard = Random.boolean()
  return {
    mbrCard: {
      mbrCardId,
      cardName: Random.cword(5, 10),
      cardDiscount: Random.natural(1, 10),
      cardTypeId: Random.pick('1001', '1002', '1003', '1004'),
      cardTypeName: Random.pick('次卡', '年卡', '私教卡', '储值卡'),
      cardPrice: Random.float(100, 1000, 0, 2),
      isValueCard,
      cardTimes: Random.pick(Random.natural(10, 100), Random.natural(1, 100)),
      cardLimit: isValueCard ? '' : Random.pick('', '无限次', '5次/月', '10次/周'),
      cardStyle: Random.integer(-1, 5),
      availTimes: Random.natural(1, 100),
      cardNo: randomId(),
      cardExpiredRange: Random.boolean() ? [Random.date(), Random.date()] : undefined,
      state: true
    },
    extendEndDate: Random.pick('无限期', Random.date()),
    cashVoucher: {
      voucherInstId: randomId(),
      voucherValue: Random.float(0, 500, 0, 2)
    }
  }
})

Mock.mock(/\/renew-mbrcard\/optimal-coupon/, () => {
  return {
    voucherInstId: randomId(),
    voucherValue: Random.float(0, 500, 0, 2)
  }
})

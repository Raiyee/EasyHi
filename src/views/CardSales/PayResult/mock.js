import Mock, {Random} from 'mockjs'

import {randomArr, randomId} from 'utils'

import pathToRegexp from 'path-to-regexp'

Mock.mock(/\/qr-order-buyer\/get-order\/\d+$/, ({url}) => {
  const results = pathToRegexp('/qr-order-buyer/get-order/:orderId').exec(url)
  const orderId = results[1]
  const isCard = Random.boolean()
  const isValueCard = Random.boolean()

  return {
    orderId,
    orderState: Random.pick(4),
    expiredSeconds: Random.integer(0, 2000),
    wxAttention: Random.boolean(),
    attentionUrl: 'https://www.qq.com',
    card: isCard ? {
      cardId: randomId(),
      cardName: Random.cword(5, 10),
      cardDiscount: Random.float(1, 10),
      cardTypeId: Random.pick('1001', '1002', '1003', '1004'),
      cardTypeName: Random.pick('次卡', '年卡', '私教卡', '储值卡'),
      cardExpired: Random.natural(1, 5) + Random.pick('年', '天', '个月'),
      cardPrice: Random.float(100, 1000, 0, 2),
      cardStyle: Random.integer(-1, 5),
      cardLimit: Random.pick('', '无限次', '5次/月', '10次/周'),
      cardTimes: Random.pick(-1, Random.float(1, 100)),
      isValueCard: isValueCard,
      soldNum: Random.natural(0, 100),
      totalSoldNum: Random.natural(0, 100),
      isOnSale: Random.boolean(),
      isOnShelf: Random.boolean(),
      activationMode: Random.boolean(),
      applicableCourse: randomArr(5).map(() => Random.cword(5, 8)),
      applicablePeriods: randomArr(6).map(() => ({
        startTime: Random.time('HH:mm'),
        endTime: Random.time('HH:mm')
      }))
    } : null,
    mbrCard: isCard ? null : {
      mbrCardId: randomId(),
      cardName: Random.cword(5, 10),
      cardDiscount: Random.integer(1, 10),
      cardTypeId: Random.pick('1001', '1002', '1003', '1004'),
      cardTypeName: Random.pick('次卡', '年卡', '私教卡', '储值卡'),
      cardPrice: Random.float(100, 1000, 0, 2),
      isValueCard: isValueCard,
      cardTimes: Random.pick(Random.integer(10, 100), Random.integer(1, 100)),
      cardLimit: isValueCard ? '' : Random.pick('', '无限次', '5次/月', '10次/周'),
      cardStyle: Random.integer(-1, 5),
      availTimes: Random.float(1, 100),
      cardNo: randomId(),
      cardExpiredRange: [Random.pick('无限期', Random.date('yyyy-MM-dd'), Random.date('yyyy-MM-dd'))],
      state: Random.boolean()
    }
  }
})

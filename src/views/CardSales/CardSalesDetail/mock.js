import Mock, {Random} from 'mockjs'

import {randomArr, randomId} from 'utils'

import pathToRegexp from 'path-to-regexp'

Mock.mock(/\/card-sales\/get-card-by-id\/\d+$/, ({url}) => {
  const cardId = pathToRegexp('/card-sales/get-card-by-id/:cardId').exec(url)[1]
  return {
    card: {
      cardId,
      cardName: Random.cword(5, 10),
      cardDiscount: Random.float(1, 10),
      cardTypeId: Random.pick('1001', '1002', '1003', '1004'),
      cardTypeName: Random.pick('次卡', '年卡', '私教卡', '储值卡'),
      cardExpired: Random.natural(1, 5) + Random.pick('年', '天', '个月'),
      cardPrice: Random.float(100, 1000, 0, 2),
      cardStyle: Random.integer(-1, 5),
      cardLimit: Random.pick('', '无限次', '5次/月', '10次/周'),
      cardTimes: Random.pick(-1, Random.float(1, 100)),
      isValueCard: Random.boolean(),
      soldNum: Random.natural(0, 100),
      totalSoldNum: Random.natural(0, 100),
      isOnSale: Random.boolean(),
      isOnShelf: Random.boolean(),
      activationMode: Random.boolean(),
      applicableCourses: randomArr(5).map(() => Random.cword(5, 8)),
      applicablePeriods: randomArr(6).map(() => ({
        startTime: Random.time('HH:mm'),
        endTime: Random.time('HH:mm')
      }))
    },
    cashVoucher: Random.boolean && {
      voucherInstId: randomId(),
      voucherValue: Random.float(0, 500, 0, 2)
    }
  }
})

Mock.mock(/\/card-sales\/updateSellState\/OFF$/, () => {
})

Mock.mock(/\/(qr-order-buyer\/create-order)|(renew-mbrcard\/create-order)|(card-sales\/create-order\/\d+)$/, () => {
  return Random.pick([{
    code: '1000',
    msg: '未登录'
  }, {
    code: '1001',
    msg: '员工不可以购买会员卡哦！'
  }, {
    code: '1002',
    msg: '商品已撤售'
  }, {
    code: '1003',
    msg: '有订单未支付'
  }, {
    code: 'ok',
    msg: '创建订单成功',
    data: {
      orderId: randomId(),
      orderState: Random.pick('1', '2')
    }
  }])
})

Mock.mock(/\/((qr-pay)|(card-sales))\/create-pay-request\/\d+/, () => {
  return {
    apiName: 'WECHAT_JSAPI',
    orderPayString: JSON.stringify({})
  }
})

Mock.mock(/\/qr-pay\/paySuccess\/\d+$/, () => {

})

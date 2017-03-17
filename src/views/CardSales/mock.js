import Mock, {Random} from 'mockjs'

import {randomArr, randomId} from 'utils'

let cardTypes, cardTypeIds

Mock.mock(/\/card-sales\/get-cards\/(allSellingCardFor(Merchant|Member))|(unSellCard)/, ({url}) => {
  const customer = url.indexOf('Member') > -1
  const offSales = url.indexOf('unSellCard') > -1

  cardTypeIds = cardTypeIds || []
  cardTypes = cardTypes || randomArr(5, 1).map(() => {
    const cardTypeId = randomId()
    cardTypeIds.push(cardTypeId)
    return {
      cardTypeId,
      cardTypeName: Random.cword(5, 10)
    }
  })

  const soldNum = Random.natural(0, 100)

  const cards = randomArr(20).map(() => {
    return {
      cardId: randomId(),
      cardName: Random.cword(5, 10),
      cardDiscount: Random.float(1, 10, 0, 1),
      cardTypeId: Random.pick(cardTypeIds),
      cardExpired: Random.natural(1, 5) + Random.pick('年', '个月'),
      cardPrice: Random.float(100, 100000, 0, 2),
      cardStyle: Random.integer(-1, 5),
      cardLimit: Random.pick('', '无限次', '5次/月', '10次/周'),
      cardTimes: Random.pick(-1, Random.float(1, 100)),
      isValueCard: Random.boolean(),
      soldNum,
      totalSoldNum: soldNum
    }
  })

  return offSales ? {cards} : {
    soldCardsNum: customer ? null : Random.natural(0, 10000),
    cardTypes,
    cards
  }
})

Mock.mock(/\/card-sales\/updateSellSate\/ON$/, ({body}) => {
})

import Mock, {Random} from 'mockjs'

import {randomArr} from 'utils'

Mock.mock(/\/card-sales\/queryConditionsAndCardList/, () => {
  const cardTypeIds = ['1001', '1002', '1003', '1004', '1005']

  return {
    cardTypes: cardTypeIds.map((val, index) => {
      return {
        cardTypeId: val,
        cardTypeName: Random.cword(5, 10),
        cards: randomArr(10).map(() => {
          return {
            cardId: Random.id(),
            cardTypeId: val,
            cardName: Random.cword(5, 10)
          }
        })
      }
    }),
    cards: randomArr(10).map(() => {
      return {
        timeStamp: Mock.mock('@date("yyyy.yy.y")'),
        subCards: randomArr(3, 1).map(() => {
          return {
            mbrCardId: '@id',
            mobile: Random.int(11),
            userId: Random.id(),
            userName: Random.cword(1, 5),
            cardName: Mock.mock('@cword(1, 6)'),
            price: Mock.mock('@float(1, 1000, 0, 2)'),
            cardNo: Mock.mock('@integer(100, 1000)'),
            cardTypeId: Mock.mock('100' + Random.character('1234')),
            cardTypeName: Mock.mock('@cword(2,3)卡'),
            isNewMember: Mock.mock('@boolean'),
            isOnShelf: Mock.mock('@boolean'),
            isOnSale: Mock.mock('@boolean')
          }
        })
      }
    })
  }
})

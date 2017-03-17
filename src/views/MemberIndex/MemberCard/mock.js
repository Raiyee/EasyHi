import Mock, {Random} from 'mockjs'

const MOCK_CARD = enabled => Mock.mock({
  mbrCardId: '@id',
  cardId: '@id',
  availTimes: '@integer(0, 10)',
  cardTimes: '@integer(0, 10)',
  cardName: '@cword(1, 8)',
  cardNo: '@cword(3, 10)',
  cardStyle: Random.integer(-1, 5),
  cardTypeId: '100' + Random.character('1234'),
  cardTypeName: '@cword(2,5)卡',
  cardDiscount: '@float(1, 9.9, 0, 2)',
  cardExpired: Random.date('yyyy.MM.dd'),
  isValueCard: '@boolean',
  expired: '@boolean',
  forbidden: '@boolean',
  state: '@boolean',
  transferred: '@boolean',
  cardExpiredRange: ['2017-03-12', '2017-03-21']
})

const MOCK_LIST = (isEnable) => new Array(Random.integer(0, 5)).fill(0).map(() => {
  return MOCK_CARD(isEnable)
})

Mock.mock(/\/member-center\/select-member-cards$/, () => {
  return {
    enableCardList: MOCK_LIST(true),
    disableCardList: MOCK_LIST(false),
    isOnlinePayment: Random.boolean()
  }
})

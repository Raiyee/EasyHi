import Mock, {Random} from 'mockjs'

import {COACH, MERCHANT, MEMBER, SERVICE} from 'utils'

export const PERMISSIONS = [{
  mobiles: [18651868823],
  roles: [COACH],
  currentRole: COACH
}, {
  mobiles: [18168067973, 18862611037],
  roles: [MERCHANT],
  currentRole: MERCHANT
}, {
  mobiles: [18551863134],
  roles: [SERVICE],
  currentRole: SERVICE
}, {
  mobiles: [18551863135],
  roles: [MEMBER],
  currentRole: MEMBER
}]

export const MOCK_CARD = () => Mock.mock({
  cardId: '@id',
  cardTimes: '@integer(0, 10)',
  cardName: '@cword(1, 8)',
  cardNo: '@integer(100, 1000)',
  cardStyle: Random.integer(-1, 5),
  cardTypeId: '100' + Random.character('1234'),
  cardTypeName: '@cword(2,5)卡',
  cardPrice: Random.integer(0, 30),
  totalSoldNum: Random.integer(0, 30),
  cardDiscount: '@float(1, 9.9, 0, 2)',
  cardExpired: Random.date('yyyy.MM.dd'),
  isValueCard: '@boolean',
  timeSlot: Random.date('MM:dd') + '-' + Random.date('MM:dd')
})

export const MOCK_CARD_INSTANCE = () => Mock.mock({
  mbrCardId: '@id',
  cardId: '@id',
  availTimes: '@integer(0, 10)',
  cardTimes: '@integer(0, 10)',
  cardName: '@cword(1, 8)',
  cardNo: '@integer(100, 1000)',
  cardStyle: Random.integer(-1, 5),
  cardTypeId: '100' + Random.character('1234'),
  cardTypeName: '@cword(2,5)卡',
  cardDiscount: '@float(1, 9.9, 0, 2)',
  cardExpired: Random.date('yyyy.MM.dd'),
  hasExpired: '@boolean',
  forbidden: '@boolean',
  state: '@boolean',
  isValueCard: '@boolean',
  timeSlot: Random.date('MM:dd') + '-' + Random.date('MM:dd'),
  transferred: '@boolean'
})

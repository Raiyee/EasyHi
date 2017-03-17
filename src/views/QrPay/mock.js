import {mock, Random} from 'mockjs'

import {randomArr, randomId} from 'utils'

mock(/\/qr-pay\/get-useful-stored-value-card/, () => randomArr(5).map(() => ({
  cardId: randomId(),
  cardNo: randomId(),
  mbrCardId: randomId(),
  cardName: Random.cword(5, 10),
  cardDiscount: Random.float(1, 10, 0, 1),
  cardExpired: Random.natural(1, 5) + Random.pick('年', '个月'),
  cardPrice: Random.float(100, 100000, 0, 2),
  cardStyle: Random.integer(-1, 5),
  cardLimit: Random.pick('', '无限次', '5次/月', '10次/周'),
  cardTimes: Random.float(1, 100, 0, 2),
  availTimes: Random.float(1, 100, 0, 2),
  isValueCard: true
})))

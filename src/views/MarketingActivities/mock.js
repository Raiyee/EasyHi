import {mock, Random} from 'mockjs'

import {randomArr, randomId, randomImg, emptyArr} from 'utils'

mock(/\/isst\/fetch-treas-list$/, () => randomArr(5, 1).map(() => mock({
  propId: randomId(),
  propName: '@ctitle',
  propImg: randomImg(),
  propRented: '@boolean'
})))

mock(/\/isst\/getTreasPageUrl\/\d+/, () => Random.url('http'))

mock(/\/expVoucher\/activity-created-num/, () => emptyArr(5).map(() => Random.natural(0, 20)))

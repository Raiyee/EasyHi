import Mock, {Random} from 'mockjs'

import {randomArr} from 'utils'

Mock.mock(/\/activity\/query-activity-list$/, randomArr(0, 3).map(() => Mock.mock({
  activityId: '@id',
  activityType: Random.integer(1, 3),
  activityName: '@cword(5,10)',
  activityImg: Random.image('700x350'),
  activityRange: [Random.date('yyyy-MM-dd'), Random.date('yyyy-MM-dd')],
  activityForm: Random.integer(1, 2),
  playUrl: Random.boolean() ? Random.url() : '',
  goodsType: Random.integer(1, 2)
})))

import Mock, {Random} from 'mockjs'
import moment from 'moment'

import {randomImg, randomMobile} from 'utils'

Mock.mock(/\/member-center$/, () => {
  let recentCourse = Random.boolean()

  if (recentCourse) {
    const startTime = +moment().add(Random.integer(-5, 0), 'd')
    recentCourse = {
      startTime,
      endTime: +moment(startTime).add(Random.pick([60, 120]), 'm'),
      bookingNum: '@integer(1,10)',
      'costDetails|1-2': [
        {
          'costCount': '@integer(1, 5)',
          'costName': '@cword(3,5)卡'
        }
      ],
      subscriptionId: '@id(11)'
    }
  }

  return Mock.mock({
    memberGender: '@boolean',
    memberPortrait: randomImg(60),
    memberName: Random.cname(),
    memberMobile: randomMobile(),
    messageCount: '@integer(0,15)',
    showId: Random.boolean() && '@id',
    recentCourse,
    cardNum: '@integer(0,10)',
    voucherNum: '@integer(0,10)',
    hasNotice: '@boolean',
    serverMobile: randomMobile(),
    authorization: Random.range(0, 3).map(index => ({
      authorized: '@boolean',
      serverName: '@cname',
      serverMobile: randomMobile(),
      serverPortrait: randomImg(60, 60, 2 * index)
    }))
  })
})

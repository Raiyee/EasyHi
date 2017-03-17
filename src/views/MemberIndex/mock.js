import Mock, {Random} from 'mockjs'
import moment from 'moment'

import {randomImg, randomArr} from 'utils'

Mock.mock(/\/membercenter\/query-member-detail$/, () => {
  let recentCourse = Random.boolean()

  if (recentCourse) {
    const startTime = +moment().add(Random.integer(0, 5), 'd')
    recentCourse = {
      startTime,
      endTime: +moment(startTime).add(Random.pick([60, 120]), 'm'),
      bookingNum: '@integer(1,10)',
      'costDetails|1-2': [
        {
          'costCount': '@integer(1, 5)',
          'costName': '@cword(3,5)@pick(["卡","券"])'
        }
      ],
      subscribeId: '@id(11)'
    }
  }

  return Mock.mock({
    userGender: '@boolean',
    userPortrait: randomImg(60),
    userName: '@cname',
    messageCount: '@integer(0,15)',
    sceneId: Random.boolean() && '@id',
    recentCourse,
    cardNum: '@integer(0,10)',
    voucherNum: '@integer(0,10)',
    hasNotice: '@boolean',
    newCashVouchers: randomArr(0, 5).map(() => Mock.mock({
      voucherName: '@ctitle',
      voucherValue: '@natural(0,7)',
      miniConsume: Random.float(1000, 5000, 0, 2),
      voucherExpiredRange: [Random.date(), new Date(moment().add(4, 'days'))]
    })),
    hasUnreadReply: '@boolean'
  })
})

Mock.mock(/\/membercenter\/update-read-times$/, () => true)

Mock.mock(/\/membercenter\/update-read-times$/, () => true)

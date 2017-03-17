import {mock, Random} from 'mockjs'

import {randomImg, randomArr, randomId} from 'utils'

import pathToRegexp from 'path-to-regexp'

mock(/\/member-manage\/get-visitor-detail\/\d+$/, ({url}) => {
  const results = pathToRegexp('/member-manage/get-visitor-detail/:visitorId').exec(url)
  const visitorId = results[1]
  const address = Random.county(true)
  const addressArr = address.split(' ')

  return mock({
    visitorId,
    visitorLevel: Random.pick('a', 'b', 'c'),
    visitorPortrait: randomImg(60, 60),
    visitorName: '@cname',
    visitorGender: '@boolean',
    sources: Random.pick(0, 1, 2, 3, 4, 5),
    operationId: randomId(),
    advisorId: randomId(),
    advisorName: '@cname',
    visitorMobile: '15051885296',
    birthday: Random.date('yyyy.MM.dd'),
    address: '@cTitle',
    provinceName: addressArr[0],
    cityName: addressArr[1],
    areaName: addressArr[2],
    brief: Random.cword(5, 30),
    followId: randomId(),
    follows: randomArr(6).map(() => {
      return mock({
        followId: randomId(),
        visitorId: randomId(),
        operatorId: randomId(),
        operatorName: '@cname',
        remark: Random.cparagraph(1, 3),
        type: Random.pick(0, 1),
        state: '@boolean',
        createTime: Random.date('yyyy.MM.dd')
      })
    }),
    advisors: randomArr(6).map(() => {
      return mock({
        advisorId: randomId(),
        advisorName: '@cname',
        visitorNum: '@natural(0,5)'
      })
    }),
    orders: randomArr(0).map(() => {
      return mock({
        ticketName: '@ctitle',
        times: '@natural(1,10)',
        scheduleName: '@ctitle',
        scheduleTime: Random.date('yyyy.MM.dd HH:mm')
      })
    }),
    tickets: randomArr(6).map(() => {
      return mock({
        vestigialTimes: '@natural(1,10)',
        availableTimes: '@natural(10,100)',
        expvoucherId: randomId(),
        expvoucherName: '@ctitle',
        startTime: Random.date('yyyy.MM.dd'),
        endTime: Random.date('yyyy.MM.dd'),
        state: Random.pick('', 'noStocks', 'expired')
      })
    })
  })
})

mock(/\/voucher\/give-visitor-voucher/, {})

mock(/\/member-manage\/add-visitor-follow/, () => {
  return mock({
    code: 0,
    data: {
      followId: randomId(),
      visitorId: randomId(),
      operatorId: randomId(),
      operatorName: '@cname',
      remark: Random.cparagraph(1, 3),
      type: Random.pick(0, 1, 2),
      state: '@boolean',
      createTime: Random.date('yyyy.MM.dd')
    },
    desc: '新增成功',
    notOK: '@boolean'
  })
})

mock(/\/member-manage\/choose-advisor$/, () => Random.boolean())

import Mock, {Random} from 'mockjs'

import {randomArr} from 'utils'

Mock.mock(/\/merchant-checkin\/query-member-today-schedules\/\d+$/, () => {
  return {
    subscribes: randomArr(6).map(() => Mock.mock({
      subscribeId: '@id',
      subscribeNum: '@integer(1,5)',
      scheduleId: '111',
      scheduleName: '@cword(3, 5)课',
      scheduleCheckedNum: '@integer(10,15)',
      scheduleBooked: '@integer(15, 20)',
      coachName: '@cword(11, 12)',
      subscribeChecked: '@boolean',
      scheduleDuration: '@integer(60, 120)',
      courseTypeName: '@cword(3, 5)课',
      scheduleStartTime: new Date()
    })),
    memberName: Random.cname()
  }
})

Mock.mock(/\/merchant-checkin\/check-single$/, () => true)

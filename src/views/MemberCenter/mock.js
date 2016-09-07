import Mock from 'mockjs'
import moment from 'moment'
const Random = Mock.Random
Mock.mock(/\/membercenter$/, () => {
  return Mock.mock({
    memberGender: '@boolean()',
    icon: '@string(0, 11)',
    memberName: Random.cname(),
    memberMobile: '@integer(10, 11)',
    messageCount: '@integer(10, 20)',
    latestCourse: '@boolean()',
    courseDuration: '@datetime(hh:mm)-@datetime(hh:mm)',
    courseDate: '@datetime(yyyy-MM-dd)周@cword("一二三四五六日")',
    startTime: Random.date('T'),
    endTime: Random.date('T'),
    courseName: Random.cname(),
    courseCost: '@integer(0, 11)',
    cardNum: '@integer(0,1)',
    subscribeId: '@integer(11)',
    voucherNum: '@integer(0, 11)',
    hasNotice: '@boolean()',
    ownerMobile: '@integer(0, 11)',
    courseBills: Mock.mock({
      'array|1-2': [
        {
          'count': '@integer(1, 5)',
          'name': Random.cname()
        }
      ]
    }).array,
    grantList: Mock.mock({
      'grantList|0-1': [
        {
          sourceName: Random.cname(),
          selected: Random.string('number', 0, 1),
          sourceMobile: Random.character('number', 11)
        }
      ]
    }).grantList
  })
})

Mock.mock(/\/membermessage$/, () => {
  var today = moment()
  var msg = new Array(Random.integer(1, 5)).fill(0).map(() => {
    let currDate = today.add(-Random.integer(1, 3), 'd')
    return {
      date: currDate,
      hiDate: {
        year: currDate.year(),
        month: +currDate.month() + 1,
        day: currDate.date(),
        week: '周' + Random.character('一二三四五六日')
      },
      userMessageDataList: new Array(Random.integer(1, 3)).fill(0).map(() => ({
        messageId: Random.character('number', 11),
        msgContent: Random.cword(5, 12),
        readState: Random.boolean(),
        type: Random.character('SQYWBDXZGRVX'),
        createTime: +Random.date('T')
      }))
    }
  })

  return {
    code: '0',
    data: {
      noMessage: Random.boolean() ? '亲~您还没有任何消息哟~' : '',
      msg: msg
    }
  }
})

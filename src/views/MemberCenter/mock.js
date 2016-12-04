import Mock from 'mockjs'
const Random = Mock.Random

Mock.mock(/\/membercenter$/, () => Mock.mock({
  memberGender: '@boolean()',
  icon: '@string(0, 11)',
  memberName: Random.cname(),
  memberMobile: '@integer(10, 11)',
  messageCount: '@integer(10, 20)',
  sceneId: '@string(0, 11)',
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
}))

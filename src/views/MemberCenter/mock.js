import Mock from 'mockjs';

const Random = Mock.Random;
Mock.mock(/\/membercenter$/, (() => {
  return {
    memberGender: '@boolean()',
    icon: '@string(0, 11)',
    memberName: '@cword(1, 11)',
    memberMobile: '@integer(10, 11)',
    messageCount: '@integer(10, 20)',
    latestCourse: '@boolean()',
    courseDuration: '@datetime(hh:mm)-@datetime(hh:mm)',
    courseDate: '@datetime(yyyy-MM-dd)周@cword("一二三四五六日")',
    startTime: Random.date('T'),
    endTime: Random.date('T'),
    courseName: '@string(5, 11)',
    courseCost: '@integer(0, 11)',
    cardNum: '@integer(0,1)',
    subscribeId: '@integer(11)',
    voucherNum: '@integer(0, 11)',
    hasNotice: '@boolean()',
    ownerMobile: '@integer(0, 11)',
    courseBills: Mock.mock({
      "array|0-1": [
        {
          "count": '@integer(1, 5)',
          "name": '@string(5, 11)'
        }
      ]
    }).array,
    grantList: Mock.mock({
      "grantList|1-2": [
        {
          sourceName: "@string(5, 11)",
          selected: Random.string('number', 0, 1),
          sourceMobile: '@string(5, 11)'
        }
      ]
    }).grantList
  };
})());

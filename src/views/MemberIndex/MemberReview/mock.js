import {mock, Random} from 'mockjs'

import {log, randomArr, randomImg} from 'utils'

mock(/\/comment\/add-comment$/, ({body}) => log(JSON.parse(body)))

mock(/\/comment\/init-comment/, {
  subscribeId: '@id',
  coachName: '@cword(3, 5)',
  scheduleName: '@cword(3,5)',
  subscribeType: '@integer(1,2)'
})

mock(/\/comment\/query-comments$/, {
  reviews: randomArr(5).map(() => {
    return mock({
      reviewId: '@id',
      userId: '@id',
      userName: '@cname',
      userGender: '@boolean',
      userPortrait: randomImg(),
      courseRate: Random.boolean() ? '@float(0,4,0,2)' : 0,
      coachRate: '@float(0,4,0,2)',
      reviewContent: '@cparagraph',
      reviewTime: '@date',
      reviewImgs: randomArr(2, 0).map(randomImg),
      reviewReply: Random.boolean() ? Random.cparagraph() : '',
      reviewVisible: '@boolean',
      courseId: '@id',
      courseName: '@ctitle',
      courseTypeName: '@ctitle',
      courseImg: randomImg(),
      coachId: '@id',
      coachName: '@cname',
      scheduleTime: '@datetime'
    })
  })
})

mock(/\/comment\/get-comment/, {
  review: mock({
    reviewId: '@id',
    userId: '@id',
    userName: '@cname',
    userGender: '@boolean',
    userPortrait: randomImg(),
    courseRate: Random.boolean() ? '@float(0,4,0,2)' : 0,
    coachRate: '@float(0,4,0,2)',
    reviewContent: '@cparagraph',
    reviewTime: '@date',
    reviewImgs: randomArr(2, 0).map(randomImg),
    reviewReply: Random.boolean() ? Random.cparagraph() : '',
    reviewVisible: '@boolean',
    courseId: '@id',
    courseName: '@ctitle',
    courseTypeName: '@ctitle',
    courseImg: randomImg(),
    coachId: '@id',
    coachName: '@cname',
    scheduleTime: '@datetime'
  })
})

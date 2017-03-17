import {mock, Random} from 'mockjs'

import {randomArr, randomId, randomImg} from 'utils'

mock(/get-reviews/, () => randomArr(10, 1).map(() => mock({
  reviewId: randomId(),
  userId: Random.boolean() ? randomId() : '',
  userName: '@cname',
  userGender: '@boolean',
  userPortrait: randomImg(),
  courseRate: Random.boolean() ? '@float(0,4,0,2)' : 0,
  coachRate: '@float(0,4,0,2)',
  reviewContent: '@cparagraph',
  reviewTime: '@date',
  reviewImgs: randomArr(6).map(randomImg),
  reviewReply: Random.boolean() ? Random.cparagraph() : '',
  reviewVisible: '@boolean',
  courseId: randomId(),
  courseName: '@ctitle',
  courseTypeName: '@ctitle',
  courseImg: randomImg(),
  coachId: randomId(),
  coachName: '@cname',
  scheduleTime: '@datetime'
})))

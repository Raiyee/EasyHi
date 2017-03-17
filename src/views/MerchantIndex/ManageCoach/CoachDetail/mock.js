import {mock, Random} from 'mockjs'
import {randomImg, randomId, randomArr, randomMobile} from 'utils'
import pathToRegexp from 'path-to-regexp'

mock(/\/merchant-coach\/add-rest-time$/, () => {
  return Random.pick([{
    code: '0',
    desc: '添加临时休息成功',
    data: '123819764862323'
  }, {
    code: '1',
    desc: '与已有休息时间重复'
  }, {
    code: '2',
    desc: '该时间段已被安排3节课，继续将同时删除这些课程，确定继续吗？'
  }, {
    code: '5',
    desc: '该时段已有课程预订，继续将自动取消预订并删除该课程，确定继续吗？'
  }])
})

mock(/\/merchant-coach\/delete-coach$/, () => {
  return Random.pick([{
    code: '1',
    desc: '该教练有被预约的课程，不能进行删除操作。'
  }, {
    code: '2',
    desc: '该教练已被排课，确认删除？'
  }])
})

mock(/\/merchant-coach\/delete-rest-time\/\d+$/, () => {
  return Random.pick([{
    code: '0',
    desc: '删除成功'
  }])
})

mock(/\/merchant-coach\/get-coach\/\d+$/, ({url}) => {
  const coachId = pathToRegexp('/merchant-coach/get-coach/:coachId').exec(url)[1]
  return mock({
    coachId,
    coachName: '@cname',
    coachGender: '@boolean',
    coachPortrait: randomImg(60, 60),
    coachRate: '',
    userId: randomId(),
    coachMobile: randomMobile(),
    mobileVisible: '@boolean',
    coachPrize: '@cparagraph(0, 3)',
    teachingExp: '@cparagraph(0, 3)',
    coachProfile: '@cparagraph(0, 3)',
    coachSpeciality: '@cparagraph(0, 3)',
    activeCourseTypes: ['高级私教课', '私教课', '普通私教课', '中级私教课', '至尊私教课'].map((val) => {
      return val
    }),
    restTimes: randomArr(3).map(() => mock({
      restId: randomId(),
      restRange: ['@datetime', '@datetime']
    })),
    coachReviews: randomArr(3).map(() => {
      return mock({
        reviewId: randomId(),
        userId: randomId(),
        userName: '@cname',
        userGender: '@boolean',
        userPortrait: randomImg(60, 60),
        coachRate: '@float(0,4,0,2)',
        reviewContent: '@cparagraph(0, 3)',
        reviewTime: Random.date('yyyy-MM-dd'),
        reviewImgs: [randomImg(60, 60)],
        reviewReply: '@cparagraph(0, 3)',
        reviewVisible: '@boolean'
      })
    })
  })
})

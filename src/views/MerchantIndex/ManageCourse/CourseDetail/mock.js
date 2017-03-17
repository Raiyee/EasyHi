import {mock, Random} from 'mockjs'
import {randomImg, randomId, randomArr} from 'utils'
import pathToRegexp from 'path-to-regexp'

mock(/\/merchant-course\/check-course\/\d+$/, () => {
  return Random.pick([{
    code: '2',
    desc: '确定删除该课程吗?'
  }, {
    code: '2',
    desc: '该课程已排入排期，删除将取消其排期，确定删除吗？'
  }, {
    code: '1',
    desc: '该课程已有会员预约，无法进行删除操作'
  }])
})

mock(/\/merchant-course\/delete\/\d+$/, () => {
  return Random.pick([{
    code: '2',
    desc: '确定删除该课程吗?'
  }, {
    code: '2',
    desc: '该课程已排入排期，删除将取消其排期，确定删除吗？'
  }, {
    code: '1',
    desc: '该课程已有会员预约，无法进行删除操作'
  }, {
    code: '0',
    desc: '删除成功'
  }])
})

mock(/\/merchant-course\/find-course\/\d+$/, ({url}) => {
  const courseId = pathToRegexp('/merchant-course/find-course/:courseId').exec(url)[1]

  return mock({
    courseId,
    courseName: '@cword(3, 6)',
    courseImg: randomImg(),
    courseRate: '@float(0,4,0,2)',
    courseProfile: '@cparagraph(0, 3)',
    courseEfficacy: '@cparagraph(0, 3)',
    courseTaboo: '@cparagraph(0, 3)',
    actionFeature: '@cparagraph(0, 3)',
    applicableCrowd: '@cparagraph(0, 3)',
    courseDuration: Random.pick('60', '75', '90', '120'),
    maxLimitNum: '@natural(0,20)',
    cardRule: {
      applicableCardNum: '@natural(0,40)',
      deductTimes: '@natural(0,20)',
      deductPrice: '@natural(0,300)'
    },
    courseReviews: randomArr(8).map(() => {
      return mock({
        reviewId: randomId(),
        userId: randomId(),
        userName: '@cname',
        userGender: '@boolean',
        userPortrait: randomImg(60, 60),
        courseRate: '@float(0,4,0,2)',
        reviewContent: '@cparagraph(2, 5)',
        reviewTime: Random.date('yyyy-MM-dd'),
        reviewImgs: [randomImg(60, 60)],
        reviewReply: '@cparagraph(2, 5)',
        reviewVisible: '@boolean'
      })
    })
  })
})

import {mock, Random} from 'mockjs'

import {randomImg, randomArr} from 'utils'

mock(/\/member-subscribe\/query-course-and-coach-detail/, () => {
  return {
    course: mock({
      courseImg: randomImg(),
      courseName: '@cword(3, 5)',
      courseRate: '@integer(1,5)',
      courseProfile: '@cword(10, 15)',
      courseEfficacy: '@cword(10, 15)',
      actionFeature: '@cword(10, 15)',
      applicableCrowd: '@cword(10, 15)',
      courseTaboo: '@cword(10, 15)',
      courseReviews: []

    }),
    coach: mock({
      coachName: '@cword(5, 10)',
      coachPortrait: randomImg(),
      coachGender: '@boolean',
      coachMobile: '@string()',
      coachRate: '@integer(1, 5)',
      coachPrize: '@cword(10, 15)',
      coachProfile: '@cword(10, 15)',
      coachSpeciality: '@cword(10, 15)',
      teachingExp: '@cword(10, 15)',
      coachReviews: [mock({
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
      })]
    })
  }
})

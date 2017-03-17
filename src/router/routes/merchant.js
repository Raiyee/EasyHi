import {STAFFS_A, STAFFS_S, STAFFS_SA} from 'utils'

export default [{
  path: '/card-earnings',
  name: 'cardEarnings',
  component: () => import('views/MerchantIndex/CardEarnings'),
  meta: {
    auth: STAFFS_A,
    init: {
      url: '/card/get-earnings',
      params: {
        currPage: 1,
        pageSize: 20,
        init: true
      }
    }
  }
}, {
  path: '/member-care',
  name: 'memberCare',
  component: () => import('views/MemberIndex/MemberCare'),
  meta: {
    init: '/member/member-care-list/0',
    auth: STAFFS_S
  }
}, {
  path: '/coach-detail/:coachId(\\d+)',
  name: 'manageCoach',
  component: () => import('views/MerchantIndex/ManageCoach/CoachDetail'),
  meta: {
    auth: STAFFS_S,
    init: {
      url: to => `/merchant-coach/get-coach/${to.params.coachId}`
    }
  }
}, {
  path: '/course-detail/:courseId(\\d+)',
  name: 'manageCourse',
  component: () => import('views/MerchantIndex/ManageCourse/CourseDetail'),
  meta: {
    auth: STAFFS_S,
    init: {
      url: to => `/merchant-course/find-course/${to.params.courseId}`
    }
  }
}, {
  path: '/visitor-detail/:visitorId(\\d+)',
  name: 'visitorDetail',
  component: () => import('views/MerchantIndex/ManageVisitor/VisitorDetail'),
  meta: {
    auth: STAFFS_SA,
    init: {
      url: to => `/member-manage/get-visitor-detail/${to.params.visitorId}`
    }
  }
}]

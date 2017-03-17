import qs from 'qs'
import {CONSUMERS, STAFFS_S} from 'utils'

export default [
  {
    path: '/subscribe-index/:courseTypeId(\\d+)?/:date(\\d{4}-\\d{2}-\\d{2})?',
    name: 'subscribeIndex',
    component: () => import('views/SubscribeIndex'),
    meta: {
      init(to) {
        return {
          url: '/member-schedule/get-subscriptions',
          params: qs.stringify({courseTypeId: to.params.courseTypeId, init: true})
        }
      }
    }
  }, {
    path: '/subscribe-schedule/:scheduleId(\\d+)/:userId(\\d+)?',
    name: 'subscribeSchedule',
    component: () => import('views/SubscribeIndex/SubscribeSchedule'),
    meta: {
      auth: to => to.params.userId ? STAFFS_S : CONSUMERS,
      init: '/subscribe/subscribe-init'
    }
  }, {
    path: '/coach-course-detail',
    name: 'scheduleRelated',
    component: () => import('views/SubscribeIndex/CoachCourseDetail'),
    meta: {
      init(to) {
        return {
          type: 'get',
          url: '/member-subscribe/query-course-and-coach-detail',
          params: {coachId: to.query.coachId, courseId: to.query.courseId}
        }
      }
    },
    beforeEnter({query: {coachId, courseId}}, from, next) {
      if (!coachId && !courseId) return next(false)

      if (!/^\d*$/.test(coachId) && !/^\d*$/.test(courseId)) return next(false)

      return next()
    }
  }]

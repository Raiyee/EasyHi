import moment from 'moment'
import qs from 'qs'
import {mapGetters, mapActions} from 'vuex'

import ScheduleCalendar from 'components/ScheduleCalendar'

import classes from './index.styl'

import {alert, confirm, omit, replaceRoute} from 'utils'

export default require('./index.pug')({
  name: 'subscribe-index',
  data() {
    const {meta: {data}, params} = this.$route
    const {calendar, courseTypes} = data

    let {courseTypeId = courseTypes[0].courseTypeId, date} = params
    const courseTypeIndex = this.getCourseTypeIndex(courseTypeId, courseTypes)

    this.toggleSubscribeType(courseTypes[courseTypeIndex].subscribeType)

    if (moment(date).isAfter(calendar[calendar.length - 1].date)) {
      replaceRoute(`/subscribe-index/${courseTypeId}`)
      date = null
    }

    return {
      classes,
      courseTypeId,
      courseTypeIndex,
      date,
      ...data
    }
  },
  destroyed() {
    this.toggleSubscribeType(0)
  },
  computed: {
    ...mapGetters(['authorized', 'rem', 'appWidth', 'winHeight',
      'subscribeType', 'isAdmin', 'isStaffS', 'merchantUrlPrefix']),
    typesStyle() {
      const length = this.courseTypes.length
      const rem = this.rem
      const width = Math.ceil((70 * length + 10) * rem)
      const appWidth = this.appWidth
      return {
        width: width + 'px',
        float: width < appWidth - (appWidth - 20 * rem) / 10 && 'right'
      }
    },
    contentStyle() {
      return {
        height: `${this.winHeight - (48 + 78) * this.rem - 4}px`
      }
    },
    transform() {
      return `translate3d(${this.courseTypeIndex * 70 * this.rem}px, 0, 0)`
    }
  },
  methods: {
    ...mapActions(['toggleSubscribeType']),
    getCourseTypeIndex(courseTypeId, courseTypes) {
      return (courseTypes || this.courseTypes).findIndex(courseType => courseTypeId === courseType.courseTypeId)
    },
    async toggleCourseType(courseTypeId) {
      if (this.courseTypeId === courseTypeId) return

      const {data} = await this.$http.post('/member-schedule/get-subscriptions', qs.stringify({courseTypeId}))

      Object.assign(this, omit(data, 'courseTypes'), {
        courseTypeId,
        courseTypeIndex: this.getCourseTypeIndex(courseTypeId)
      })

      this.toggleSubscribeType(this.courseTypes[this.courseTypeIndex].subscribeType)
      replaceRoute(`/subscribe-index/${this.courseTypeId}`)
    },
    toggleActiveDate(activeDate) {
      replaceRoute(`/subscribe-index/${this.courseTypeId}/${activeDate}`)
    },
    redirectToLogin() {
      this.$router.push({
        path: '/login',
        query: {
          from: this.$route.fullPath
        }
      })
    },
    async activeSchedule(scheduleId, remainingNum, confirm) {
      if (!remainingNum && !this.isAdmin) return

      if (!this.authorized) return this.redirectToLogin()

      const {data: {code, desc}} = await this.$http.post(`/member-subscribe/open-schedule/validation/${scheduleId}`,
        qs.stringify({
          confirm
        }))

      this.resolveResult(code, desc, scheduleId, () => this.activeSchedule(scheduleId, remainingNum, true))
    },
    async subscribePrivate(coachId, minute, time, confirm) {
      if (!this.authorized) return this.redirectToLogin()

      const {data: {code, data: scheduleId, desc}} =
        await this.$http.post(`/member-subscribe/private-schedule/validation/${coachId}`, qs.stringify({
          minute,
          time,
          courseTypeId: this.courseTypeId,
          confirm
        }))

      this.resolveResult(code, desc, scheduleId, () => this.subscribePrivate(coachId, minute, time, true), true)
    },
    resolveResult(code, desc, scheduleId, confirmed, isPrivate) {
      switch (+code) {
        case 0:
          const prefix = isPrivate ? 'merchant-subscribe/member-search/' : 'merchant-single-schedule-detail/'
          if (this.isStaffS) return (location.href = this.merchantUrlPrefix + prefix + scheduleId)
          this.$router.push('/subscribe-schedule/' + scheduleId)
          break
        case 2:
          confirm({
            tipText: desc,
            confirm: confirmed
          })
          break
        case 3:
          this.redirectToLogin()
          break
        default:
          alert(desc)
      }
    }
  },
  components: {
    ScheduleCalendar
  }
})

import {mapGetters, mapActions} from 'vuex'

import ScheduleCalendar from 'components/ScheduleCalendar'

import classes from './index.styl'

import {omitObj, replaceRoute} from 'utils'

export default require('./index.pug')({
  name: 'member-subscribe',
  data() {
    const route = this.$route
    const params = route.params
    const metaData = route.meta.data

    this.toggleSubscribeType(metaData.subscribeType)

    const courseTypes = metaData.courseTypes
    const courseTypeId = params.courseTypeId || courseTypes[0].courseTypeId

    return {
      classes,
      courseTypeId,
      courseTypeIndex: courseTypes.findIndex(courseType => courseType.courseTypeId === courseTypeId),
      date: params.date,
      ...omitObj(metaData, 'subscribeType')
    }
  },
  created() {
    this.toggleMenuInactive('SUBSCRIBE_CLASS')
  },
  destroyed() {
    this.toggleSubscribeType(0)
    this.toggleMenuInactive(null)
  },
  computed: {
    ...mapGetters(['rem', 'appWidth', 'winHeight', 'subscribeType']),
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
    ...mapActions(['toggleSubscribeType', 'toggleMenuInactive']),
    toggleCourseType(courseTypeId) {
      if (this.courseTypeId === courseTypeId) return
      return this.$http.post('/get-schedules', {courseTypeId})
        .then(({data}) => {
          Object.assign(this, omitObj(data, 'courseTypes'), {
            courseTypeId,
            courseTypeIndex: this.courseTypes.findIndex(courseType => courseTypeId === courseType.courseTypeId)
          })
          this.toggleSubscribeType(this.courseTypes[this.courseTypeIndex].subscribeType)
          replaceRoute(`/member-subscribe/${this.courseTypeId}`)
        })
    },
    toggleActiveDate(activeDate) {
      replaceRoute(`/member-subscribe/${this.courseTypeId}/${activeDate}`)
    }
  },
  components: {
    ScheduleCalendar
  }
})

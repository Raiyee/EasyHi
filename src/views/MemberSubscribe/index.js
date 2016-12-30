import {mapGetters, mapActions} from 'vuex'

import ScheduleCalendar from 'components/ScheduleCalendar'

import classes from './index.styl'

import {pickObj, omitObj} from 'utils'

export default require('./index.pug')({
  name: 'member-subscribe',
  data() {
    return {
      classes,
      date: null,
      courseTypeId: null,
      courseTypeIndex: 0,
      calendar: [],
      courseTypes: [],
      coaches: {},
      schedules: {}
    }
  },
  created() {
    const metaData = this.$route.meta.data
    const subscribeType = metaData.subscribeType
    this.toggleSubscribeType(subscribeType)
    Object.assign(this, omitObj(metaData, 'subscribeType'))
    this.courseTypeId || Object.assign(this, pickObj(this.courseTypes[0], 'courseTypeId', 'subscribeType'))
  },
  destroyed() {
    this.toggleSubscribeType(0)
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
    ...mapActions(['toggleSubscribeType']),
    toggleCourseType(courseTypeId) {
      if (this.courseTypeId === courseTypeId) return
      return this.$http.post('/get-schedules', {courseTypeId})
        .then(({data}) => {
          Object.assign(this, omitObj(data, 'courseTypes'), {
            courseTypeId,
            courseTypeIndex: this.courseTypes.findIndex(courseType => courseTypeId === courseType.courseTypeId)
          })
          this.toggleSubscribeType(this.courseTypes[this.courseTypeIndex].subscribeType)
        })
    }
  },
  components: {
    ScheduleCalendar
  }
})

import {mapGetters} from 'vuex'

import {pickObj, omitObj} from 'utils'

import ScheduleCalendar from 'components/ScheduleCalendar'

export default require('./index.pug')({
  name: 'member-subscribe',
  data() {
    return {
      classes: require('./index.styl'),
      date: null,
      courseTypeId: null,
      courseTypeIndex: 0,
      calendar: [],
      courseTypes: [],
      coaches: {},
      schedules: {},
      subscribeType: 0
    }
  },
  created() {
    Object.assign(this, this.$route.meta.data)
    this.courseTypeId || Object.assign(this, pickObj(this.courseTypes[0], 'courseTypeId', 'subscribeType'))
  },
  computed: {
    ...mapGetters(['rem', 'winWidth', 'winHeight']),
    typesStyle() {
      const length = this.courseTypes.length
      const rem = this.rem
      const width = Math.ceil((70 * length + 10) * rem)
      const winWidth = this.winWidth
      return {
        width: width + 'px',
        float: width < winWidth - (winWidth - 20 * rem) / 10 && 'right'
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
    toggleCourseType(courseTypeId) {
      if (this.courseTypeId === courseTypeId) return
      return this.$http.get('/get-schedules', {courseTypeId})
        .then(({data}) => {
          Object.assign(this, omitObj(data, 'courseTypes'), {
            courseTypeId,
            courseTypeIndex: this.courseTypes.findIndex(courseType => courseTypeId === courseType.courseTypeId)
          })
        })
    }
  },
  components: {
    ScheduleCalendar
  }
})

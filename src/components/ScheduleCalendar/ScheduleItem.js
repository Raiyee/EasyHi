import moment from 'moment'
import {mapGetters} from 'vuex'

import classes from './schedule-item.styl'

import {REQUIRED_ARRAY, REQUIRED_NUMBER, REQUIRED_STRING} from 'utils'

export default require('./schedule-item.pug')({
  name: 'schedule-item',
  props: {
    scheduleId: REQUIRED_STRING,
    coachId: REQUIRED_STRING,
    courseId: REQUIRED_STRING,
    courseImg: REQUIRED_STRING,
    bookedNum: REQUIRED_NUMBER,
    coachName: REQUIRED_STRING,
    scheduleRange: REQUIRED_ARRAY,
    scheduleName: REQUIRED_STRING,
    remainingNum: REQUIRED_NUMBER
  },
  data: () => ({classes}),
  computed: {
    ...mapGetters(['memberUrlPrefix', 'style']),
    scheduleDuration() {
      const {scheduleRange} = this
      return (moment(scheduleRange[1]) - moment(scheduleRange[0])) / 1000 / 60
    }
  },
  methods: {
    activeSchedule() {
      this.$emit('activeSchedule', this.scheduleId, this.remainingNum)
    },
    gotoDetail() {
      this.$router.push({path: '/coach-course-detail', query: {coachId: this.coachId, courseId: this.courseId}})
    }
  }
})

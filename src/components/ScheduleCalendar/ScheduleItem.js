import classes from './schedule-item.styl'

import {REQUIRED_NUMBER, REQUIRED_STRING} from 'utils'

export default require('./schedule-item.pug')({
  name: 'schedule-item',
  props: {
    scheduleId: REQUIRED_STRING,
    coursePicUrl: REQUIRED_STRING,
    scheduleBooked: REQUIRED_NUMBER,
    scheduleCoach: REQUIRED_STRING,
    scheduleStartTime: REQUIRED_NUMBER,
    scheduleEndTime: REQUIRED_NUMBER,
    scheduleName: REQUIRED_STRING,
    scheduleRemaining: REQUIRED_NUMBER
  },
  data: () => ({classes}),
  computed: {
    scheduleDuration() {
      return (this.scheduleEndTime - this.scheduleStartTime) / 1000 / 60
    }
  },
  methods: {
    toggleActive: function (e) {
      !this.scheduleRemaining || this.$emit('toggleActiveData', e, this.scheduleId)
    }
  }
})

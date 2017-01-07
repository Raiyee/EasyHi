import {mapGetters} from 'vuex'

import CalendarItem from './CalendarItem'

import classes from './calendar.styl'

const periodWidth = 7 * 50 + 5

export default require('./calendar.pug')({
  name: 'calendar',
  props: {
    calendar: Array,
    activeIndex: Number,
    translateX: Number
  },
  data: () => ({classes}),
  computed: {
    ...mapGetters(['mode', 'rem', 'appWidth']),
    baseWidth() {
      return (periodWidth * this.calendar.length / 7 + 10) * this.rem
    },
    flex() {
      const appWidth = this.appWidth
      return !this.mode && this.baseWidth < appWidth - 20
    },
    calendarWidth() {
      if (!this.flex) return this.baseWidth
      return this.appWidth - 20
    },
    calendarStyle() {
      return {
        width: `${this.calendarWidth}px`,
        transform: `translate3d(${this.translateX}px, 0, 0)`
      }
    },
    transform() {
      const activeIndex = this.activeIndex
      const perWidth = this.calendarWidth / this.calendar.length
      const translateX = this.flex ? perWidth * activeIndex + (perWidth - 55) / 2
        : (activeIndex * 50 + ~~(activeIndex / 7) * 5) * this.rem
      return `translate3d(${translateX}px, 0, 0)`
    }
  },
  methods: {
    toggleActive(e, date) {
      this.$emit('toggleActiveDate', e, date)
    }
  },
  components: {
    CalendarItem
  }
})

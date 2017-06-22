import moment from 'moment'
import {mapGetters} from 'vuex'

import Calendar from './Calendar'
import CoachItem from './CoachItem'
import ScheduleItems from './ScheduleItems'

import classes from './index.styl'

import {REQUIRED_ARRAY, animate, formatDate, lastDayOfWeek, weekDates, toNum, throttle} from 'utils'

const periodWidth = 7 * 50 + 5

const reset = function () {
  this.translateX = 0
  this.activeDate = null
  this.scrolling = true
  const {calendar, schedules} = this.$refs
  animate(calendar, 'scrollLeft', 0)
  animate(schedules, 'scrollTop', {
    callback: () => (this.scrolling = false)
  })
}

export default require('./index.pug')({
  name: 'schedule-calendar',
  props: {
    calendar: REQUIRED_ARRAY,
    date: String,
    month: String,
    schedules: Object,
    coaches: Object,
    contentStyle: Object,
    subscribeType: {
      type: Number,
      default: 1
    },
    keyPrefix: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      classes,
      activeCoachId: null,
      activeDate: this.date,
      translateX: 0,
      translateStart: 0,
      translating: false,
      panning: false,
      scrolling: false
    }
  },
  computed: {
    ...mapGetters(['mode', 'rem']),
    itemsHeight() {
      return toNum(this.contentStyle.height)
    },
    activeIndex() {
      const activeDate = formatDate(this.activeDate)
      const lastDay = this.mode ? lastDayOfWeek(activeDate) : this.calendar.slice(-1)[0].date
      return this.calendar.findIndex(({date, status}) =>
        date >= activeDate && date <= lastDay && [1, 2].includes(status) && (this.activeDate = date))
    },
    activeItems() {
      const items = this.subscribeType - 1 ? this.coaches : this.schedules
      if (!this.mode) return items
      const weekdays = weekDates(this.activeDate)
      const activeItems = {}
      for (const [key, value] of Object.entries(items)) {
        if (!weekdays.includes(key)) continue
        activeItems[key] = value
      }
      return activeItems
    }
  },
  watch: {
    mode: reset,
    calendar: reset
  },
  mounted() {
    const activeIndex = moment(formatDate(this.activeDate)).diff(this.calendar[0].date, 'days')
    this.translateX = -Math.floor((activeIndex / 7)) * periodWidth * this.rem
    this.subscribeType - 1 || setTimeout(() => this.toggleActiveDate(this.activeDate), 0)
  },
  methods: {
    toggleActiveDate(activeDate) {
      if (this.translating) return
      const {date, schedules} = this.$refs
      const index = Object.keys(this.activeItems).findIndex(scheduleDate => activeDate === scheduleDate)
      if (index === -1) return

      const dateRef = date[index]

      if (dateRef) {
        this.scrolling = true
        animate(schedules, 'scrollTop', {
          value: dateRef.$el.offsetTop - schedules.offsetTop,
          callback: () => (this.scrolling = false)
        })
      }

      this.emitActiveDate(activeDate)
    },
    emitActiveDate(activeDate) {
      this.$emit('toggleActiveDate', this.activeDate = activeDate)
    },
    moveStart() {
      if (!this.mode) return
      this.translateStart = this.translateX
      this.translating = this.panning = true
    },
    moving(e) {
      if (!this.mode) return
      this.translateX = this.translateStart + e.changedX
    },
    moveEnd(e) {
      if (!this.mode) return
      this.panning = false
      const currentIndex = -Math.round(this.translateStart / periodWidth / this.rem)
      const nextIndex = Math.abs(e.changedX) > 20 ? e.changedX < 0
        ? Math.min(this.calendar.length / 7 - 1, currentIndex + 1) : Math.max(0, currentIndex - 1) : currentIndex
      this.translateX = -nextIndex * periodWidth * this.rem
      if (currentIndex === nextIndex) return
      this.scrolling = true
      const activeDate = this.calendar[nextIndex * 7].date
      this.emitActiveDate(activeDate)
      animate(this.$refs.schedules, 'scrollTop', {
        callback: () => (this.scrolling = false)
      })
    },
    onTransitionEnd() {
      if (this.panning) return
      this.translating = false
    },
    onScroll: throttle(function () {
      if (this.scrolling || +this.subscribeType === 2) return
      const {date, schedules} = this.$refs
      let activeDate
      const offset = schedules.offsetTop + schedules.scrollTop
      for (const vm of date) {
        if (vm.$el.offsetTop - offset >= 3 * this.rem) break
        activeDate = vm.date
      }
      if (this.activeDate === activeDate) return
      this.emitActiveDate(activeDate)
    }),
    toggleActiveCoach(coachId) {
      this.activeCoachId = coachId
    },
    activeSchedule(scheduleId, remainingNum) {
      this.$emit('activeSchedule', scheduleId, remainingNum)
    },
    subscribePrivate(activeMinute, activeTime) {
      this.$emit('subscribePrivate', this.activeCoachId, activeMinute, this.activeDate + ' ' + activeTime + ':00')
    }
  },
  components: {
    Calendar,
    CoachItem,
    ScheduleItems
  }
})

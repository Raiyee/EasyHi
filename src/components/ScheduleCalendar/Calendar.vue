<template>
  <ol class="list-unstyled clearfix scroll-list"
      :class="[classes.calendar, flex && classes.flex]"
      :style="calendarStyle">
    <calendar-item v-for="(item, index) of calendar"
                   :date="item.date"
                   :status="item.status"
                   :class="{first: !(index % 7)}"
                   :active="activeIndex === index"
                   :key="item.date"
                   @toggleActive="toggleActive"/>
    <li class="scroll-bg"
        :class="{active: activeIndex !== -1}"
        :style="{transform}">
      <div class="theme-bg"/>
    </li>
  </ol>
</template>
<script>
  import {mapGetters} from 'vuex'

  import classes from './calendar.styl'

  import CalendarItem from './CalendarItem'

  import {formatDate, lastDayOfWeek} from 'utils/moment'

  const periodWidth = 7 * 50 + 5

  export default{
    props: {
      calendar: Array,
      activeDate: String,
      translateX: Number
    },
    data() {
      return {
        classes
      }
    },
    computed: {
      ...mapGetters(['mode', 'rem', 'winWidth']),
      baseWidth() {
        return (periodWidth * this.calendar.length / 7 + 10) * this.rem
      },
      flex() {
        const winWidth = this.winWidth
        return !this.mode && this.baseWidth < winWidth - 20
      },
      calendarWidth() {
        if (!this.flex) return this.baseWidth
        return this.winWidth - 20
      },
      activeIndex() {
        const activeDate = formatDate(this.activeDate)
        const lastDay = this.mode ? lastDayOfWeek(activeDate) : this.calendar.slice(-1)[0].date
        return this.calendar.findIndex(({date, status}) =>
        date >= activeDate && date <= lastDay && [1, 2].includes(status))
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
  }
</script>

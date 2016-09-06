<template>
  <div :class="classes.scheduleCalendar">
    <div class="panel" :class="classes.courseTypePanel">
      <div class="panel-body">
        <div :class="month">{{ activeDate | formatDate('MM')}}月</div>
        <div>
          <slot/>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body" ref="calendar">
        <calendar v-if="mode"
                  v-touch:panstart="onPanStart"
                  v-touch:pan="onPan"
                  v-touch:panend="onPanEnd"
                  :calendar="calendar"
                  :activeDate="activeDate"
                  :translateX="translateX"
                  @toggleActiveDate="toggleActiveDate"
                  @transitionend.native.self="onTransitionEnd"/>
        <calendar v-else
                  :calendar="calendar"
                  :activeDate="activeDate"
                  :translateX="translateX"
                  @toggleActiveDate="toggleActiveDate"/>
      </div>
    </div>
    <div :class="classes.schedules" :style="schedulesStyle" ref="schedules" @scroll="onScroll">
      <ol class="list-unstyled">
        <schedule-items v-for="(scheduleItems, date, index) of activeSchedules"
                        ref="date"
                        :class="classes.scheduleItems"
                        :date="date"
                        :last="index === Object.keys(activeSchedules).length - 1"
                        :schedulesHeight="schedulesHeight"
                        :scheduleItems="scheduleItems"/>
      </ol>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  import classes from './index.styl'

  import Calendar from './Calendar'
  import ScheduleItems from './ScheduleItems'

  const periodWidth = 7 * 50 + 5

  import {
    REQUIRED_ARRAY,
    REQUIRED_OBJECT,
    animate,
    weekdays
  } from 'utils'

  const reset = function () {
    this.translateX = 0
    this.activeDate = null
    this.scrolling = true
    const $refs = this.$refs
    animate($refs.calendar, 'scrollLeft', 0)
    animate($refs.schedules, 'scrollTop', {
      callback: () => {
        this.scrolling = false
      }
    })
  }

  export default {
    name: 'schedule-calendar',
    props: {
      calendar: REQUIRED_ARRAY,
      date: String,
      month: String,
      schedules: REQUIRED_OBJECT,
      schedulesStyle: Object
    },
    data() {
      return {
        classes,
        activeDate: this.date,
        translateX: 0,
        translateStart: 0,
        translating: false,
        panning: false,
        scrolling: false
      }
    },
    watch: {
      mode: reset,
      calendar: reset
    },
    computed: {
      ...mapGetters(['mode', 'rem', 'winWidth']),
      schedulesHeight() {
        return +this.schedulesStyle.height.replace('px', '')
      },
      activeSchedules() {
        const schedules = this.schedules
        if (!this.mode) return schedules
        const weekDays = weekdays(this.activeDate)
        const activeSchedules = {}
        for (const [key, value] of Object.entries(schedules)) {
          if (!weekDays.includes(key)) continue
          activeSchedules[key] = value
        }
        return activeSchedules
      }
    },
    methods: {
      toggleActiveDate(e, date) {
        if (this.translating) return
        const refs = this.$refs
        const schedules = refs.schedules
        const dateIndex = Object.keys(this.activeSchedules).findIndex(scheduleDate => date === scheduleDate)
        this.scrolling = true
        animate(schedules, 'scrollTop', {
          value: refs.date[dateIndex].$el.offsetTop - schedules.offsetTop,
          callback: () => {
            this.scrolling = false
          }
        })
        this.activeDate = date
      },
      onPanStart() {
        if (!this.mode) return
        this.translateStart = this.translateX
        this.translating = this.panning = true
      },
      onPan(e) {
        if (!this.mode) return
        this.translateX = this.translateStart + e.deltaX
      },
      onPanEnd(e) {
        if (!this.mode) return
        this.panning = false
        const currentIndex = -Math.round(this.translateStart / periodWidth / this.rem)
        const nextIndex = e.deltaX < 0
          ? Math.min(this.calendar.length / 7 - 1, currentIndex + 1) : Math.max(0, currentIndex - 1)
        this.translateX = -nextIndex * periodWidth * this.rem
        if (currentIndex === nextIndex) return
        this.scrolling = true
        this.activeDate = this.calendar[nextIndex * 7].date
        animate(this.$refs.schedules, 'scrollTop', {
          callback: () => {
            this.scrolling = false
          }
        })
      },
      onTransitionEnd() {
        if (this.panning) return
        this.translating = false
      },
      onScroll() {
        if (this.scrolling) return
        const refs = this.$refs
        const schedules = refs.schedules
        let date
        for (const vm of refs.date) {
          if (vm.$el.offsetTop - schedules.offsetTop - schedules.scrollTop >= 3 * this.rem) break
          date = vm.date
        }
        this.activeDate = date
      }
    },
    components: {
      Calendar,
      ScheduleItems
    }
  }
</script>

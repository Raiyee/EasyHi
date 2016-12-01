<template>
  <div :class="$style.scheduleCalendar">
    <div class="panel" :class="$style.courseTypePanel">
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
                  v-touch="{methods: true}"
                  :calendar="calendar"
                  :activeIndex="activeIndex"
                  :translateX="translateX"
                  @toggleActiveDate="toggleActiveDate"
                  @transitionend.native.self="onTransitionEnd"/>
        <calendar v-else
                  :calendar="calendar"
                  :activeIndex="activeIndex"
                  :translateX="translateX"
                  @toggleActiveDate="toggleActiveDate"/>
      </div>
    </div>
    <div :class="$style.content" :style="contentStyle" ref="schedules" @scroll="onScroll">
      <ol class="list-unstyled" v-if="Object.keys(activeItems).length">
        <schedule-items v-if="subscribeType == 1"
                        v-for="(scheduleItems, date, index) of activeItems"
                        ref="date"
                        :key="`${date}_${index}`"
                        :class="$style.scheduleItems"
                        :date="date"
                        :last="index === Object.keys(activeItems).length - 1"
                        :itemsHeight="itemsHeight"
                        :scheduleItems="scheduleItems"/>
        <coach-item v-if="subscribeType == 2"
                    v-for="coachItem of activeItems[activeDate]"
                    ref="date"
                    :key="coachItem.coachId"
                    :coachItem="coachItem"
                    :activeCoachId="activeCoachId"
                    @toggleActiveCoach="toggleActiveCoach"/>
      </ol>
      <no-item v-else text="本周没有安排任何课程"/>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  import Calendar from './Calendar'
  import CoachItem from './CoachItem'
  import ScheduleItems from './ScheduleItems'
  import NoItem from 'components/NoItem'

  const periodWidth = 7 * 50 + 5

  import {REQUIRED_ARRAY, animate, formatDate, lastDayOfWeek, weekDates, toNum} from 'utils'

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
      schedules: Object,
      coaches: Object,
      contentStyle: Object,
      subscribeType: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        activeCoachId: null,
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
        const items = this.subscribeType === 2 ? this.coaches : this.schedules
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
    methods: {
      toggleActiveDate(e, date) {
        if (this.translating) return
        const refs = this.$refs
        const schedules = refs.schedules
        const dateIndex = Object.keys(this.activeItems).findIndex(scheduleDate => date === scheduleDate)
        if (dateIndex === -1) return
        this.scrolling = true
        refs.date && refs.date[dateIndex] && animate(schedules, 'scrollTop', {
          value: refs.date[dateIndex].$el.offsetTop - schedules.offsetTop,
          callback: () => {
            this.scrolling = false
          }
        })
        this.activeDate = date
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
        const nextIndex = e.changedX < 0
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
        if (this.scrolling || +this.subscribeType === 2) return
        const refs = this.$refs
        const schedules = refs.schedules
        let date
        for (const vm of refs.date) {
          if (vm.$el.offsetTop - schedules.offsetTop - schedules.scrollTop >= 3 * this.rem) break
          date = vm.date
        }
        this.activeDate = date
      },
      toggleActiveCoach(coachId) {
        this.activeCoachId = coachId
      }
    },
    components: {
      Calendar,
      CoachItem,
      ScheduleItems,
      NoItem
    }
  }
</script>
<style src="./index.styl" module/>

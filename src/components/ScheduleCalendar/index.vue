<template>
  <div class="schedule-calendar">
    <div class="panel course-type-panel">
      <div class="panel-body">
        <div :style="monthStyle">{{ activeDate | formatDate('MM')}}月</div>
        <div>
          <slot/>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body" ref="calendar">
        <ol class="list-unstyled clearfix scroll-list calendar"
            :class="{flex}"
            :style="calendarStyle"
            v-touch:panstart="onPanStart"
            v-touch:pan="onPan"
            v-touch:panend="onPanEnd"
            @transitionend.self="onTransitionEnd">
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
      </div>
    </div>
    <div class="schedules" :style="schedulesStyle" ref="schedules" @scroll="onScroll">
      <ol class="list-unstyled">
        <schedule-items v-for="(scheduleItems, date, index) of activeSchedules"
                        ref="date"
                        :date="date"
                        :last="index === Object.keys(activeSchedules).length - 1"
                        :schedulesHeight="schedulesHeight"
                        :scheduleItems="scheduleItems"/>
      </ol>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  import CalendarItem from './CalendarItem';
  import ScheduleItems from './ScheduleItems';

  import {
    REQUIRED_ARRAY,
    REQUIRED_OBJECT,
    formatDate,
    lastDayOfWeek,
    animate,
    weekdays
  } from 'utils';

  const periodWidth = 7 * 50 + 5;

  export default {
    name: 'schedule-calendar',
    props: {
      calendar: REQUIRED_ARRAY,
      date: String,
      monthStyle: Object,
      schedules: REQUIRED_OBJECT,
      schedulesStyle: Object
    },
    data() {
      return {
        activeDate: this.date,
        translateX: 0,
        translateStart: 0,
        translating: false,
        panning: false,
        scrolling: false
      };
    },
    watch: {
      calendar() {
        this.translateX = 0;
        this.activeDate = null;
        this.scrolling = true;
        const $refs = this.$refs;
        animate($refs.calendar, 'scrollLeft', 0);
        animate($refs.schedules, 'scrollTop', {
          callback: () => {
            this.scrolling = false;
          }
        });
      }
    },
    computed: {
      ...mapGetters(['mode', 'rem', 'winWidth']),
      baseWidth() {
        return periodWidth * this.calendar.length / 7 + 10;
      },
      flex() {
        const winWidth = this.winWidth;
        return !this.mode && this.baseWidth < winWidth - 20;
      },
      calendarWidth() {
        if (!this.flex) return this.baseWidth;
        return this.winWidth - 20;
      },
      schedulesHeight() {
        return +this.schedulesStyle.height.replace('px', '');
      },
      activeSchedules() {
        const schedules = this.schedules;
        if (!this.mode) return schedules;
        const weekDays = weekdays(this.activeDate);
        const activeSchedules = {};
        for (const [key, value] of Object.entries(schedules)) {
          if (!weekDays.includes(key)) continue;
          activeSchedules[key] = value;
        }
        return activeSchedules;
      },
      activeIndex() {
        const activeDate = formatDate(this.activeDate);
        const lastDay = this.mode ? lastDayOfWeek(activeDate) : this.calendar.slice(-1)[0].date;
        return this.calendar.findIndex(({date, status}) =>
        date >= activeDate && date <= lastDay && [1, 2].includes(status));
      },
      calendarStyle() {
        return {
          width: `${this.calendarWidth}px`,
          transform: `translate3d(${this.translateX}px, 0, 0)`
        };
      },
      transform() {
        const activeIndex = this.activeIndex;
        const perWidth = this.calendarWidth / this.calendar.length;
        const translateX = this.flex ? perWidth * activeIndex + (perWidth - 55) / 2
          : (activeIndex * 50 + ~~(activeIndex / 7) * 5) * this.rem;
        return `translate3d(${translateX}px, 0, 0)`;
      }
    },
    methods: {
      toggleActive(e, date) {
        if (this.translating) return;
        const refs = this.$refs;
        const schedules = refs.schedules;
        const dateIndex = Object.keys(this.activeSchedules).findIndex(scheduleDate => date === scheduleDate);
        this.scrolling = true;
        animate(schedules, 'scrollTop', {
          value: refs.date[dateIndex].$el.offsetTop - schedules.offsetTop,
          callback: () => {
            this.scrolling = false;
          }
        });
        this.activeDate = date;
      },
      onPanStart() {
        if (!this.mode) return;
        this.translateStart = this.translateX;
        this.translating = this.panning = true;
      },
      onPan(e) {
        if (!this.mode) return;
        this.translateX = this.translateStart + e.deltaX;
      },
      onPanEnd(e) {
        if (!this.mode) return;
        this.panning = false;
        const currentIndex = -Math.round(this.translateStart / periodWidth / this.rem);
        const nextIndex = e.deltaX < 0
          ? Math.min(this.calendar.length / 7 - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
        this.translateX = -nextIndex * periodWidth * this.rem;
        if (currentIndex === nextIndex) return;
        this.scrolling = true;
        this.activeDate = this.calendar[nextIndex * 7].date;
        animate(this.$refs.schedules, 'scrollTop', {
          callback: () => {
            this.scrolling = false;
          }
        });
      },
      onTransitionEnd() {
        if (this.panning) return;
        this.translating = false;
      },
      onScroll() {
        if (this.scrolling) return;
        const refs = this.$refs;
        const schedules = refs.schedules;
        let date;
        for (const vm of refs.date) {
          if (vm.$el.offsetTop - schedules.offsetTop - schedules.scrollTop >= 3 * this.rem) break;
          date = vm.date;
        }
        this.activeDate = date;
      }
    },
    components: {
      CalendarItem,
      ScheduleItems
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>

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
      <div class="panel-body">
        <ol class="list-unstyled clearfix scroll-list calendar"
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
          <li class="theme-bg scroll-bg"
              :class="{active: activeIndex !== -1}"
              :style="{transform}"/>
        </ol>
      </div>
    </div>
    <div class="schedules" :style="schedulesStyle" ref="schedules">
      <ol class="list-unstyled">
        <schedule-items v-for="(scheduleItems, date, index) of activeSchedules"
                        :ref="date"
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

  import {REQUIRED_ARRAY, REQUIRED_OBJECT, formatDate, lastDayOfWeek, scrollTop, weekdays} from 'utils';

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
        panning: false
      };
    },
    computed: {
      ...mapGetters(['rem', 'winWidth', 'threshold']),
      schedulesHeight() {
        return +this.schedulesStyle.height.replace('px', '');
      },
      activeSchedules() {
        const weekDays = weekdays(this.activeDate);
        const activeSchedules = {};
        for (const [key, value] of Object.entries(this.schedules)) {
          if (weekDays.includes(key)) {
            activeSchedules[key] = value;
          }
        }
        return activeSchedules;
      },
      activeIndex() {
        const date = formatDate(this.activeDate);
        const sunday = lastDayOfWeek(date);
        return this.calendar.findIndex(({date: itemDate, status}) =>
        itemDate >= date && itemDate <= sunday && [1, 2].includes(status));
      },
      calendarStyle() {
        return {
          width: (periodWidth * this.calendar.length / 7 + 10) * this.rem + 'px',
          transform: `translate3d(${this.translateX}px, 0, 0)`
        };
      },
      transform() {
        const activeIndex = this.activeIndex;
        return `translate3d(${(activeIndex * 50 + ~~(activeIndex / 7) * 5) * this.rem}px, 0, 0)`;
      }
    },
    methods: {
      toggleActive(e, date) {
        const refs = this.$refs;
        const schedules = refs.schedules;
        scrollTop(schedules, refs[date][0].$el.offsetTop - schedules.offsetTop);
        this.translating || (this.activeDate = date) && this.$emit('toggleActiveDate', e, date);
      },
      toTriggerPan() {
        return this.winWidth < this.threshold;
      },
      onPanStart() {
        if (!this.toTriggerPan()) return;
        this.translateStart = this.translateX;
        this.translating = this.panning = true;
      },
      onPan(e) {
        if (!this.toTriggerPan()) return;
        this.translateX = this.translateStart + e.deltaX;
      },
      onPanEnd(e) {
        if (!this.toTriggerPan()) return;
        this.panning = false;
        const currentIndex = -Math.round(this.translateStart / periodWidth / this.rem);
        const nextIndex = e.deltaX < 0
          ? Math.min(this.calendar.length / 7 - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
        this.translateX = -nextIndex * periodWidth * this.rem;
        if (currentIndex === nextIndex) return;
        this.activeDate = this.calendar[nextIndex * 7].date;
        scrollTop(this.$refs.schedules, 0);
      },
      onTransitionEnd() {
        if (this.panning) return;
        this.translating = false;
      }
    },
    components: {
      CalendarItem,
      ScheduleItems
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>

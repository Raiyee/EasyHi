<template>
  <div class="schedule-calendar">
    <div class="panel">
      <div class="panel-body">
        <div class="pull-left">09月</div>
        <div class="pull-right">
          <slot/>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <ol class="calendar list-unstyled clearfix"
            :style="style"
            v-touch:panstart="onPanStart"
            v-touch:pan="onPan"
            v-touch:panend="onPanEnd"
            @transitionend.self="onTransitionEnd">
          <calendar-item v-for="(calendarItem, index) of calendar"
                         :date="calendarItem.date"
                         :status="calendarItem.status"
                         :class="{monday: !(index % 7)}"
                         :active="activeIndex === index"
                         :key="calendarItem.date"
                         @click="toggleActive"/>
          <li class="theme-bg scroll-bg"
              :class="{active: activeIndex !== -1}"
              :style="{transform}"/>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import moment from 'moment';

  import CalendarItem from './ScheduleCalendarItem';

  import {DATE_FORMAT, lastDayOfWeek} from 'utils';

  const translateBase = 7 * 50 + 5;

  export default {
    name: 'schedule-calendar',
    props: {
      calendar: {
        type: Array,
        required: true
      },
      date: {
        type: String
      }
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
      activeIndex() {
        const date = this.activeDate || moment().format(DATE_FORMAT);
        const sunday = lastDayOfWeek(date);

        return this.calendar.findIndex(({date: itemDate, status}) =>
        itemDate >= date && itemDate <= sunday && [1, 2].includes(status));
      },
      style() {
        return {
          width: (355 * this.calendar.length / 7 + 10) * this.rem + 'px',
          transform: `translate3d(${this.translateX}px, 0, 0)`
        };
      },
      transform() {
        const activeIndex = this.activeIndex;
        const translateX = (activeIndex * 50 + ~~(activeIndex / 7) * 5) * this.rem;
        return `translate3d(${translateX}px, 0, 0)`;
      }
    },
    methods: {
      getCurrentIndex() {
        return -Math.round(this.translateX / translateBase / this.rem);
      },
      toggleActive(e, date) {
        this.activeDate = date;
      },
      toTriggerPan() {
        return this.winWidth < this.threshold;
      },
      onPanStart(e) {
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
        const deltaX = e.deltaX;
        const currentIndex = this.getCurrentIndex();
        // eslint-disable-next-line max-len
        const nextIndex = deltaX < 0 ? Math.min(this.calendar.length / 7 - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
        this.translateX = -nextIndex * translateBase * this.rem;
      },
      onTransitionEnd() {
        if (this.panning) return;
        this.translating = false;
        this.activeDate = this.calendar[this.getCurrentIndex() * 7].date;
      }
    },
    components: {
      CalendarItem
    }
  };
</script>
<style lang="stylus" src="./schedule-calendar" scoped/>

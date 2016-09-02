<template>
  <div class="schedule-calendar">
    <div class="panel course-type-panel">
      <div class="panel-body">
        <div :style="month">{{ activeMonth }}月</div>
        <div>
          <slot/>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <ol class="list-unstyled clearfix scroll-list calendar"
            :style="style"
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
    <schedules :schedules="schedules"/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import moment from 'moment';

  import CalendarItem from './CalendarItem';
  import Schedules from './Schedules';

  import {DATE_FORMAT, MONTH_FORMAT, formatDate, lastDayOfWeek} from 'utils';

  const periodWidth = 7 * 50 + 5;

  export default {
    name: 'schedule-calendar',
    props: {
      calendar: {
        type: Array,
        required: true
      },
      date: String,
      month: Object,
      schedules: {
        type: Object,
        required: true
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
      activeMonth() {
        return formatDate(this.activeDate || [], MONTH_FORMAT);
      },
      activeIndex() {
        const date = this.activeDate || moment().format(DATE_FORMAT);
        const sunday = lastDayOfWeek(date);
        return this.calendar.findIndex(({date: itemDate, status}) =>
        itemDate >= date && itemDate <= sunday && [1, 2].includes(status));
      },
      style() {
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
        this.translating || (this.activeDate = date) && this.$emit('toggleActiveDate', e, date);
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
        const currentIndex = -Math.round(this.translateStart / periodWidth / this.rem);
        const nextIndex = e.deltaX < 0
          ? Math.min(this.calendar.length / 7 - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
        this.translateX = -nextIndex * periodWidth * this.rem;
        currentIndex === nextIndex || (this.activeDate = this.calendar[nextIndex * 7].date);
      },
      onTransitionEnd() {
        if (this.panning) return;
        this.translating = false;
      }
    },
    components: {
      CalendarItem,
      Schedules
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>

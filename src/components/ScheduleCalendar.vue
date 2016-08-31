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
        <ol class="calendar list-unstyled clearfix" :style="{width: calendarWidth + 'px'}">
          <calendar-item v-for="(calendarItem, index) of calendar"
                         :date="calendarItem.date"
                         :status="calendarItem.status"
                         :class="{monday: !(index % 7), active: activeIndex === index}"
                         :key="calendarItem.date"
                         @click="toggleActive"/>
          <li class="theme-bg scroll-bg" :style="{transform: bgTransform}"></li>
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

  export default {
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
        activeDate: this.date
      };
    },
    computed: {
      ...mapGetters(['rem']),
      activeIndex() {
        const date = this.activeDate || moment().format(DATE_FORMAT);
        const sunday = lastDayOfWeek(date);

        return this.calendar.findIndex(({date: itemDate, status}) =>
        itemDate >= date && itemDate <= sunday && [1, 2].includes(status));
      },
      calendarWidth() {
        return (355 * this.calendar.length / 7 + 10) * this.rem;
      },
      bgTransform() {
        const activeIndex = this.activeIndex;
        const translateX = (activeIndex * 50 + ~~(activeIndex / 7) * 5) * this.rem;
        return `translate3d(${translateX}px, 0, 0)`;
      }
    },
    methods: {
      toggleActive(e, date) {
        this.activeDate = date;
      }
    },
    components: {
      CalendarItem
    }
  };
</script>
<style lang="stylus" src="./schedule-calendar" scoped/>

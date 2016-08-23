<template>
  <div class="full-calendar">
    <ul>
      <calendar-item v-for="day in days"
                     :day="day"
                     :key="day"
                     :calendarStatus="calendarStatus"/>
    </ul>
  </div>
</template>
<script>
  import moment from 'moment';
  import utils from 'utils';

  import CalendarItem from './FullCalendarItem';

  export default{
    props: {
      calendar: {
        type: Object,
        required: true,
        validator(calendar) {
          const date = calendar.date;
          const activeDate = calendar.activeDate;

          for (let value of [date, activeDate]) {
            if (value && !moment(value).isValid()) return false;
          }
          const range = calendar.range;
          return !(range && (!utils.isArray(range) || range.length !== 2));
        }
      },
      calendarStatus: {
        type: Array,
        required: true,
        validator(calendar) {
          const len = calendar.length;
          if (!len) return true;
          if (len % 7) return false;

          const firstDate = moment(calendar[0].date);
          if (![0, 1].includes(firstDate.day())) return false;
          for (let [index, value] of calendar.entries()) {
            if (firstDate.add(+!!index, 'd').format(utils.DATE_FORMAT) === value.date) continue;
            return false;
          }

          return true;
        }
      }
    },
    data() {
      return {
        days: []
      };
    },
    created() {
      this.days = utils.getWeeks(this.calendar.date);
    },
    updated() {
//      console.log(this.calendarStatus);
    },
    computed: {},
    components: {
      CalendarItem
    }
  };
</script>
<style lang="stylus" src="./full-calendar" scoped/>

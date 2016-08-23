<template>
  <li>
    {{day}}
    <br>
    {{statusText}}
  </li>
</template>
<script>
  import {getWeekday} from 'utils';

  export default{
    props: {
      day: String,
      calendarStatus: Array
    },
    data() {
      return {};
    },
    computed: {
      statusText() {
        const calendar = this.calendarStatus.find(calendar => calendar.date === this.day) || {};
        return calendar.statusText || getWeekday(this.day);
      }
    }
  };
</script>
<style lang="stylus" src="./full-calendar-item" scoped/>

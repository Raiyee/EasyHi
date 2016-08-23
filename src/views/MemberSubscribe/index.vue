<template>
  <div>
    <full-calendar :calendar="calendar" :calendarStatus="calendarStatus"/>
    <scroll-calendar :calendarStatus="calendarStatus"/>
  </div>
</template>
<script>
  import FullCalendar from 'components/FullCalendar';
  import ScrollCalendar from 'components/ScrollCalendar';

  import {statusText} from 'utils';

  export default{
    name: 'member-subscribe',
    data() {
      return {
        courseTypeId: null,
        courseTypes: [],
        calendarStatus: [],
        calendar: {
          activeDate: null,
          range: [0, 3]
        }
      };
    },
    created() {
      this.$http.get('/get-schedules').then(res => {
        const data = res.json();
        data.calendarStatus.map(calendar => Object.assign(calendar, {
          statusText: statusText(calendar.status, calendar.date)
        }));
//        this.calendarStatus = data.calendarStatus;
        Object.assign(this, data);
      });
    },
    components: {
      FullCalendar,
      ScrollCalendar
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>

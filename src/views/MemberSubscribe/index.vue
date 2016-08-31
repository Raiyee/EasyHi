<template>
  <schedule-calendar :calendar="calendar" :date="date">
    小班课
  </schedule-calendar>
</template>
<script>
  import ScheduleCalendar from 'components/ScheduleCalendar';

  export default{
    name: 'member-subscribe',
    data() {
      return {
        date: null,
        calendar: []
      };
    },
    created() {
      Object.assign(this, this.$route.meta.data);
    },
    computed: {},
    components: {
      ScheduleCalendar
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>

<template>
  <div>
    <full-calendar :calendar="calendar"/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  import FullCalendar from 'components/FullCalendar';

  export default{
    name: 'member-subscribe',
    data() {
      return {
        courseTypeId: null,
        courseTypes: [],
        calendar: {
          activeDate: null,
          range: [0, 3]
        }
      };
    },
    computed: {
      ...mapGetters(['calendarStatus'])
    },
    components: {
      FullCalendar
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>

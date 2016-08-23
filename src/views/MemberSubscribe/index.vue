<template>
  <div>
    <scroll-calendar :calendar="calendar"/>
  </div>
</template>
<script>
  import ScrollCalendar from 'components/ScrollCalendar';

  export default{
    name: 'member-subscribe',
    data() {
      return {
        courseTypeId: null,
        courseTypes: [],
        calendar: []
      };
    },
    created() {
      this.$http.get('/get-schedules').then(res => Object.assign(this, res.json()));
    },
    components: {
      ScrollCalendar
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>

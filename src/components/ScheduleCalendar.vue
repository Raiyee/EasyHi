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
          <li v-for="i in length" :class="{active: i === 1, monday: i % 7 === 1}">
            <div>
              <span>26</span>
              <span>周一</span>
            </div>
          </li>
          <li class="theme-bg scroll-bg"></li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default{
    data() {
      return {
        length: 7
      };
    },
    computed: {
      ...mapGetters(['rem']),
      calendarWidth() {
        return (355 * this.length / 7 + 10) * this.rem;
      }
    }
  };
</script>
<style lang="stylus" src="./schedule-calendar" scoped/>

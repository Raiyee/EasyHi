<template>
  <li class="full-calendar-item"
      :class="{active: active, disabled: disabled}"
      @click="toggleActive">
    <div>
      {{dateTime}}
      <br>
      {{statusText}}
    </div>
  </li>
</template>
<script>
  import {mapGetters} from 'vuex';

  import {getWeekday, getDatetime} from 'utils';

  export default{
    props: {
      day: String,
      index: Number,
      activeDayIndex: Number
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['calendarStatus']),
      current() {
        return this.calendarStatus.find(calendar => calendar.date === this.day) || {status: 1};
      },
      active() {
        return this.index === this.activeDayIndex;
      },
      disabled() {
        return ![1, 2].includes(this.current.status);
      },
      dateTime() {
        return getDatetime(this.day, 'date');
      },
      statusText() {
        return this.current.statusText || getWeekday(this.day);
      }
    },
    methods: {
      toggleActive(e) {
        this.disabled || this.$emit('click', e, this.day, this.index);
      }
    }
  };
</script>
<style lang="stylus" src="./full-calendar-item" scoped/>

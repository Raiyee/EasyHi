<template>
  <li :class="{active, disabled}" @click="toggleActive">
    <div>
      <span>{{ day }}</span>
      <span :class="{'theme-color': !active && 2 === status}">{{ statusText }}</span>
    </div>
  </li>
</template>
<script>
  import {getDatetime, getWeekday} from 'utils/moment';

  /**
   * 排期存在 4 种状态
   * 0 -> 无课
   * 1 -> 正常
   * 2 -> 订满
   * 3 -> 有课但已过期
   */
  const statusText = (status, date) => {
    switch (status) {
      case (0):
        return '无课';
      case (2):
        return '订满';
    }
    return getWeekday(date);
  };

  export default{
    name: 'schedule-calendar-item',
    props: {
      active: {
        type: Boolean,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      status: {
        type: Number,
        required: true
      }
    },
    computed: {
      disabled() {
        return [0, 3].includes(this.status);
      },
      day() {
        return getDatetime(this.date, 'date');
      },
      statusText() {
        return statusText(this.status, this.date);
      }
    },
    methods: {
      toggleActive(e) {
        this.active || this.disabled || this.$emit('toggleActive', e, this.date);
      }
    }
  };
</script>
<style lang="stylus" src="./item.styl" scoped/>

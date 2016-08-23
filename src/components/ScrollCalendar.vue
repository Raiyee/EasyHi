<template>
  <div class="calendar-container">
    <ol class="calendar list-unstyled clearfix"
        :style="{width: calendarWidth + 'px'}"
        v-touch:swipe="onSwipe">
      <calendar-item v-for="(calendarItem, index) of calendar"
                     :class="{active: index === activeIndex}"
                     :date="calendarItem.date"
                     :status="calendarItem.status"
                     :index="index"
                     :key="calendarItem"
                     @click="toggleActive"/>
      <calendar-item :style="{transform: transform, marginLeft: marginLeft + 'px'}"/>
    </ol>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  import CalendarItem from './CalendarItem';

  import moment from 'moment';
  import utils from 'utils';

  const divisor = 7 * 375;

  export default {
    name: 'scroll-calendar',
    props: {
      calendar: {
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
        activeIndex: 0
      };
    },
    updated: (() => {
      let updateCount = 0;
      return function () {
        if (updateCount++) return;
        this.activeIndex = this.calendar.findIndex(calendarItem => [1, 2].includes(calendarItem.status));
      };
    })(),
    computed: {
      ...mapGetters(['width', 'rem']),
      marginLeft() {
        const activeIndex = this.activeIndex;
        const offset = this.baseWidth - 55 * 7 * this.width;
        return (~~(activeIndex / 6) * 6 + activeIndex % 6) * offset / 6 / divisor;
      },
      baseWidth() {
        // 为了计算更精确, 统一使用此大整数进行宽度换算
        return this.width * (375 - 20);
      },
      calendarWidth() {
        return this.baseWidth * this.calendar.length / divisor;
      },
      itemWidth() {
        return this.baseWidth / divisor;
      },
      transform() {
        return `translate3d(${this.baseWidth * this.activeIndex / divisor}px, 0, 0)`;
      }
    },
    methods: {
      toggleActive(disabled, index) {
        disabled || (this.activeIndex = index);
      },
      onSwipe(e) {
        console.log('onSwipe', e);
      }
    },
    components: {
      CalendarItem
    }
  };
</script>
<style lang="stylus" src="./scroll-calendar" scoped/>

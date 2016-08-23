<template>
  <div v-if="calendarStatus.length" class="calendar-container">
    <ol class="calendar list-unstyled clearfix"
        :style="{width: calendarWidth + 'px', transform: transform}"
        v-touch:panstart="onPanStart"
        v-touch:pan="onPan"
        v-touch:panend="onPanEnd">
      <calendar-item v-for="(calendarItem, index) of calendarStatus"
                     :class="{active: index === activeIndex}"
                     :date="calendarItem.date"
                     :status="calendarItem.status"
                     :baseWidth="baseWidth"
                     :itemWidth="itemWidth"
                     :divisor="divisor"
                     :index="index"
                     :key="calendarItem"
                     @click="toggleActive"/>
      <calendar-item :baseWidth="baseWidth"
                     :itemWidth="itemWidth"
                     :class="{active: bgActive}"
                     :style="{transform: bgTransform, marginLeft: marginLeft + 'px'}"/>
    </ol>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  import CalendarItem from './CalendarItem';

  import moment from 'moment';
  import utils from 'utils';

  export default {
    name: 'scroll-calendar',
    props: {
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
        activeIndex: 0,
        activeIndexFetched: false,
        divisor: 7 * 375,
        translate: 0,
        baseTranslate: 0,
        transformIndex: 0,
        translating: false
      };
    },
    updated() {
      if (this.activeIndexFetched) return;
      this.activeIndexFetched = true;
      this.activeIndex = this.calendarStatus.findIndex(calendarItem => [1, 2].includes(calendarItem.status));
    },
    computed: {
      ...mapGetters(['width', 'threshold']),
      marginLeft() {
        return this.offset(this.activeIndex);
      },
      baseWidth() {
        // 为了计算更精确, 统一使用此大整数进行宽度换算
        return this.width < this.threshold ? this.width * (375 - 20) : (this.width - 20) * 375;
      },
      calendarWidth() {
        return this.baseWidth * this.calendarStatus.length / this.divisor;
      },
      itemWidth() {
        return this.baseWidth / this.divisor;
      },
      transform() {
        return `translate3d(${this.translate}px, 0, 0)`;
      },
      bgTransform() {
        return `translate3d(${this.baseWidth * this.activeIndex / this.divisor}px, 0, 0)`;
      },
      bgActive() {
        const activeIndex = this.activeIndex;
        const transformIndex = -this.getTransformIndex();
        return this.translating || transformIndex === Math.floor(activeIndex / 7);
      }
    },
    methods: {
      offset(index) {
        if (this.width >= this.threshold) return 0;
        const offset = this.baseWidth - 55 * 7 * this.width;
        return (~~(index / 6) * 6 + index % 6) * offset / (6 * this.divisor);
      },
      getTransformIndex() {
        return Math.floor(this.translate * this.divisor / (7 * this.baseWidth));
      },
      toggleActive(disabled, index) {
        disabled || this.translating || (this.activeIndex = index);
      },
      onPanStart() {
        this.baseTranslate = this.translate;
        this.transformIndex = this.getTransformIndex();
      },
      onPan(e) {
        this.translate = this.baseTranslate + e.deltaX;
        this.translating = true;
      },
      onPanEnd() {
        let translate = this.translate;
        let transformIndex = this.transformIndex;
        transformIndex = translate - this.baseTranslate > 0 ? Math.min(0, transformIndex + 1)
          : Math.max(1 - this.calendarStatus.length / 7, transformIndex - 1);
        const offsetIndex = transformIndex * 7;
        this.translate = offsetIndex * this.baseWidth / this.divisor + this.offset(offsetIndex);
        setTimeout(() => {
          this.translating = false;
        }, 0);
      }
    },
    components: {
      CalendarItem
    }
  };
</script>
<style lang="stylus" src="./scroll-calendar" scoped/>

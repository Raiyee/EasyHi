<template>
  <div class="full-calendar">
    年份: {{year}}
    月份: {{month}}
    <div class="calendar-container">
      <ul class="list-unstyled clearfix"
          :class="{transition: !changing}"
          :style="{width: baseWidth + 'px', transform: transform}"
          @transitionend.self="onTransitionEnd">
        <calendar-item v-for="(day, index) in days"
                       :day="day"
                       :index="index"
                       :activeDayIndex="activeDayIndex"
                       :key="day"
                       :calendarStatus="calendarStatus"
                       :style="{width: itemWidth + 'px'}"
                       @click="toggleActive"
                       v-touch:panstart="onPanStart"
                       v-touch:pan="onPan"
                       v-touch:panend="onPanEnd"/>
        <li class="scroll-bg theme-bg"
            v-show="bgActive"
            :class="{transition: !changing}"
            :style="{transform: bgTransform}"/>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  import moment from 'moment';
  import {DATE_FORMAT, isArray, getWeeks, getDatetime, firstDayOfWeek} from 'utils';

  import CalendarItem from './FullCalendarItem';

  export default{
    props: {
      calendar: {
        type: Object,
        required: true,
        validator(calendar) {
          const date = calendar.date;
          const activeDate = calendar.activeDay;

          for (let value of [date, activeDate]) {
            if (value && !moment(value).isValid()) return false;
          }
          const range = calendar.range;
          return !(range && (!isArray(range) || range.length !== 2));
        }
      },
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
            if (firstDate.add(+!!index, 'd').format(DATE_FORMAT) === value.date) continue;
            return false;
          }

          return true;
        }
      }
    },
    data() {
      return {
        days: getWeeks(),
        activeDay: null,
        activeDayIndex: 7,
        activeIndex: 0,
        translateStart: 0,
        translating: false,
        currentTranslateX: 0,
        changing: false,
        dataFetched: false
      };
    },
    updated() {
      if (this.dataFetched) return;
      let activeDay = firstDayOfWeek(this.calendar.date);
      const days = this.days = getWeeks(activeDay);
      const calendar = this.calendarStatus.find(calendar =>
        [1, 2].includes(calendar.status) && !moment(calendar.date).isBefore(activeDay));
      calendar && (this.activeDay = activeDay = calendar.date);
      this.activeDayIndex = days.findIndex((day, index) => {
        return index > 6 && index < 14 && day === activeDay;
      });
      this.dataFetched = true;
    },
    computed: {
      ...mapGetters(['winWidth', 'rem']),
      year() {
        return getDatetime(this.days[7], 'y');
      },
      month() {
        return getDatetime(this.days[7], 'month') + 1;
      },
      currentIndex() {
        return ~~(this.activeDayIndex / 7) - 1;
      },
      baseWidth() {
        return this.itemWidth * 21 + 10 * this.rem;
      },
      itemWidth() {
        return (this.winWidth - 20 * this.rem) / 7;
      },
      translateX() {
        return this.translating ? this.currentTranslateX : (-1 - this.activeIndex) * this.itemWidth * 7;
      },
      transform() {
        return this.getTransform(this.translateX);
      },
      bgTranslateX() {
        return 5 * this.rem + (this.itemWidth - 55 * this.rem) / 2 + this.itemWidth * this.activeDayIndex;
      },
      bgTransform() {
        return this.getTransform(this.bgTranslateX);
      },
      bgActive() {
        return this.translating || this.activeIndex === this.currentIndex;
      }
    },
    methods: {
      getTransform(translateX) {
        return 'translate3d(' + translateX + 'px, 0, 0)';
      },
      toggleActive(e, day, index) {
        if (this.translating) return;
        this.translating = true;
        setTimeout(() => {
          this.activeDayIndex = index;
          this.translating = false;
          this.activeDay = day;
        }, 0);
      },
      onPanStart() {
        this.translateStart = this.translateX;
        this.translating = true;
      },
      onPan(e) {
        this.currentTranslateX = this.translateStart + e.deltaX;
      },
      onPanEnd() {
        const changedX = this.currentTranslateX - this.translateStart;
        let activeIndex = this.activeIndex;
        changedX > 0 ? activeIndex-- : activeIndex++;
        activeIndex > -2 && activeIndex < 2 && (this.activeIndex = activeIndex);
        this.translating = false;
      },
      getDayIndex(days, date) {
        return days.findIndex(day => day === date);
      },
      onTransitionEnd() {
        if (this.translating) return;
        this.changing = true;
        let days = this.days;
        const activeDay = this.activeDay;
        const activeIndex = this.activeIndex;
        days = getWeeks(days[7 + activeIndex * 7]);
        const activeDayIndex = this.getDayIndex(days, activeDay);
        Object.assign(this, {
          days,
          activeIndex: 0,
          activeDayIndex
        });
        setTimeout(() => (this.changing = false), 0);
      }
    },
    components: {
      CalendarItem
    }
  };
</script>
<style lang="stylus" src="./full-calendar" scoped/>

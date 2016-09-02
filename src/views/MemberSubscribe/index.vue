<template>
  <schedule-calendar :calendar="calendar"
                     :date="date"
                     :monthStyle="{lineHeight: 25 * rem + 'px'}"
                     :schedules="schedules"
                     :schedulesStyle="schedulesStyle"
                     @toggleActiveDate="toggleActiveDate">
    <ul class="list-unstyled clearfix scroll-list course-types"
        :style="typesStyle">
      <li v-for="(courseType, index) of courseTypes"
          :class="{first: !index, active: courseTypeId === courseType.courseTypeId}"
          @click="toggleCourseType(courseType.courseTypeId)">
        {{ courseType.courseTypeName }}
      </li>
      <li class="theme-bg scroll-bg active" :style="{transform}"/>
    </ul>
  </schedule-calendar>
</template>
<script>
  import {mapGetters} from 'vuex';

  import ScheduleCalendar from 'components/ScheduleCalendar';

  export default{
    name: 'member-subscribe',
    data() {
      return {
        date: null,
        courseTypeId: null,
        courseTypeIndex: 0,
        calendar: [],
        courseTypes: [],
        schedules: []
      };
    },
    created() {
      Object.assign(this, this.$route.meta.data);
      this.courseTypeId = this.courseTypeId || this.courseTypes[0].courseTypeId;
    },
    computed: {
      ...mapGetters(['rem', 'winWidth', 'winHeight']),
      typesStyle() {
        const length = this.courseTypes.length;
        const rem = this.rem;
        const width = Math.ceil((70 * length + 10) * rem);
        const winWidth = this.winWidth;
        return {
          width: width + 'px',
          float: width > winWidth - (winWidth - 20 * rem) / 10 || 'right'
        };
      },
      schedulesStyle() {
        const height = this.winHeight - (48 + 78) * this.rem - 4;
        return {
          height: height + 'px'
        };
      },
      transform() {
        return `translate3d(${this.courseTypeIndex * 70 * this.rem}px, 0, 0)`;
      }
    },
    methods: {
      toggleActiveDate(e, date) {
      },
      toggleCourseType(courseTypeId) {
        this.courseTypeId = courseTypeId;
        this.courseTypeIndex = this.courseTypes.findIndex(courseType => courseTypeId === courseType.courseTypeId);
      }
    },
    components: {
      ScheduleCalendar
    }
  };
</script>
<style lang="stylus" src="./index.styl" scoped/>

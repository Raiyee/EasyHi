<template>
  <schedule-calendar :calendar="calendar"
                     :date="date"
                     :subscribeType="subscribeType"
                     :month="$style.month"
                     :schedules="schedules"
                     :coaches="coaches"
                     :contentStyle="contentStyle">
    <ul class="list-unstyled clearfix scroll-list"
        :class="$style.courseTypes"
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
  import {mapGetters} from 'vuex'

  import {pickObj, omitObj} from 'utils'

  import ScheduleCalendar from 'components/ScheduleCalendar'

  export default{
    name: 'member-subscribe',
    data() {
      return {
        date: null,
        courseTypeId: null,
        courseTypeIndex: 0,
        calendar: [],
        courseTypes: [],
        coaches: {},
        schedules: {},
        subscribeType: 0
      }
    },
    created() {
      Object.assign(this, this.$route.meta.data)
      this.courseTypeId || Object.assign(this, pickObj(this.courseTypes[0], 'courseTypeId', 'subscribeType'))
    },
    computed: {
      ...mapGetters(['rem', 'winWidth', 'winHeight']),
      typesStyle() {
        const length = this.courseTypes.length
        const rem = this.rem
        const width = Math.ceil((70 * length + 10) * rem)
        const winWidth = this.winWidth
        return {
          width: width + 'px',
          float: width < winWidth - (winWidth - 20 * rem) / 10 && 'right'
        }
      },
      contentStyle() {
        return {
          height: `${this.winHeight - (48 + 78) * this.rem - 4}px`
        }
      },
      transform() {
        return `translate3d(${this.courseTypeIndex * 70 * this.rem}px, 0, 0)`
      }
    },
    methods: {
      toggleCourseType(courseTypeId) {
        if (this.courseTypeId === courseTypeId) return
        return this.$http.get('/get-schedules', {courseTypeId})
          .then(({data}) => {
            Object.assign(this, omitObj(data, 'courseTypes'), {
              courseTypeId,
              courseTypeIndex: this.courseTypes.findIndex(courseType => courseTypeId === courseType.courseTypeId)
            })
          })
      }
    },
    components: {
      ScheduleCalendar
    }
  }
</script>
<style src="./index.styl" module/>

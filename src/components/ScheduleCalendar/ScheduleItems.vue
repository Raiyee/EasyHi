<template>
  <li class="schedule-items" :style="itemsStyle">
    <div class="theme-bg schedule-weekday">
      {{ date | getWeekday }}
    </div>
    <ol class="list-unstyled">
      <schedule-item v-for="(scheduleItem, index) of scheduleItems"
                     :coursePicUrl="scheduleItem.coursePicUrl"
                     :scheduleBooked="scheduleItem.scheduleBooked"
                     :scheduleCoach="scheduleItem.scheduleCoach"
                     :scheduleEndTime="scheduleItem.scheduleEndTime"
                     :scheduleStartTime="scheduleItem.scheduleStartTime"
                     :scheduleName="scheduleItem.scheduleName"
                     :scheduleRemaining="scheduleItem.scheduleRemaining"
      />
    </ol>
  </li>
</template>
<script>
  import {mapGetters} from 'vuex'

  import ScheduleItem from './ScheduleItem'

  import {REQUIRED_ARRAY, REQUIRED_BOOLEAN, REQUIRED_NUMBER, REQUIRED_STRING} from 'utils/constants'

  export default {
    props: {
      date: REQUIRED_STRING,
      last: REQUIRED_BOOLEAN,
      schedulesHeight: REQUIRED_NUMBER,
      scheduleItems: REQUIRED_ARRAY
    },
    computed: {
      ...mapGetters(['rem']),
      itemsStyle() {
        const itemsLength = this.scheduleItems.length
        const pr = Math.ceil(this.rem * 1000) / 1000
        const itemsHeight = this.schedulesHeight - (28 + 113 * itemsLength) * pr - itemsLength + 1
        return {
          marginBottom: this.last && `${itemsHeight}px`
        }
      }
    },
    components: {
      ScheduleItem
    }
  }
</script>
<style lang="stylus" src="./schedule-items" scoped/>

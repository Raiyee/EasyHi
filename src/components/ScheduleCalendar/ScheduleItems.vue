<template>
  <li :style="itemsStyle">
    <div class="theme-bg schedule-weekday">
      {{ date | getWeekday }}
    </div>
    <ol class="list-unstyled" v-if="scheduleItems.length">
      <schedule-item v-for="(scheduleItem, index) of scheduleItems"
                     :key="scheduleItem.scheduleId"
                     :class="{disabled: !scheduleItem.scheduleRemaining}"
                     :coursePicUrl="scheduleItem.coursePicUrl"
                     :scheduleBooked="scheduleItem.scheduleBooked"
                     :scheduleCoach="scheduleItem.scheduleCoach"
                     :scheduleStartTime="scheduleItem.scheduleStartTime"
                     :scheduleEndTime="scheduleItem.scheduleEndTime"
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
      itemsHeight: REQUIRED_NUMBER,
      last: REQUIRED_BOOLEAN,
      scheduleItems: REQUIRED_ARRAY
    },
    computed: {
      ...mapGetters(['rem']),
      itemsStyle() {
        if (!this.last) return
        const itemsLength = this.scheduleItems.length
        const pr = Math.floor(this.rem * 10) / 10
        const itemsHeight = this.itemsHeight - (28 + 113 * itemsLength) * pr - itemsLength + 1
        return {
          marginBottom: `${itemsHeight}px`
        }
      }
    },
    components: {
      ScheduleItem
    }
  }
</script>

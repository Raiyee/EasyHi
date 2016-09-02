<template>
  <li>
    <div class="theme-bg schedule-weekday">
      {{ date | getWeekday }}
    </div>
    <ol class="list-unstyled">
      <schedule-item v-for="scheduleItem of scheduleItems"
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
  import ScheduleItem from './ScheduleItem';

  import {REQUIRED_ARRAY, REQUIRED_STRING} from 'utils/constants';

  export default{
    props: {
      date: REQUIRED_STRING,
      scheduleItems: REQUIRED_ARRAY
    },
    methods: {},
    components: {
      ScheduleItem
    }
  };
</script>
<style lang="stylus" src="./schedule-items"/>

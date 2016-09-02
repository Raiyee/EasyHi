<template>
  <ol class="list-unstyled schedules">
    <schedule-items v-for="(scheduleItems, date) of schedules"
                    :date="date"
                    :scheduleItems="scheduleItems"/>
  </ol>
</template>
<script>
  import ScheduleItems from './ScheduleItems';

  export default{
    props: {
      schedules: {
        type: Object,
        required: true
      }
    },
    components: {
      ScheduleItems
    }
  };
</script>

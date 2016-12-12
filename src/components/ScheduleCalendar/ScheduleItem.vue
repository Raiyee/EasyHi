<template src="./schedule-item.pug"/>
<script>
  import {REQUIRED_NUMBER, REQUIRED_STRING} from 'utils'

  export default{
    props: {
      coursePicUrl: REQUIRED_STRING,
      scheduleBooked: REQUIRED_NUMBER,
      scheduleCoach: REQUIRED_STRING,
      scheduleStartTime: REQUIRED_NUMBER,
      scheduleEndTime: REQUIRED_NUMBER,
      scheduleName: REQUIRED_STRING,
      scheduleRemaining: REQUIRED_NUMBER
    },
    computed: {
      scheduleDuration() {
        return (this.scheduleEndTime - this.scheduleStartTime) / 1000 / 60
      }
    }
  }
</script>
<style src="./schedule-item" module/>

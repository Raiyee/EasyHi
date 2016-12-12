<template src="./calendar.pug"/>
<script>
  import {mapGetters} from 'vuex'

  import CalendarItem from './CalendarItem'

  const periodWidth = 7 * 50 + 5

  export default {
    props: {
      calendar: Array,
      activeIndex: Number,
      translateX: Number
    },
    computed: {
      ...mapGetters(['mode', 'rem', 'winWidth']),
      baseWidth() {
        return (periodWidth * this.calendar.length / 7 + 10) * this.rem
      },
      flex() {
        const winWidth = this.winWidth
        return !this.mode && this.baseWidth < winWidth - 20
      },
      calendarWidth() {
        if (!this.flex) return this.baseWidth
        return this.winWidth - 20
      },
      calendarStyle() {
        return {
          width: `${this.calendarWidth}px`,
          transform: `translate3d(${this.translateX}px, 0, 0)`
        }
      },
      transform() {
        const activeIndex = this.activeIndex
        const perWidth = this.calendarWidth / this.calendar.length
        const translateX = this.flex ? perWidth * activeIndex + (perWidth - 55) / 2
          : (activeIndex * 50 + ~~(activeIndex / 7) * 5) * this.rem
        return `translate3d(${translateX}px, 0, 0)`
      }
    },
    methods: {
      toggleActive(e, date) {
        this.$emit('toggleActiveDate', e, date)
      }
    },
    components: {
      CalendarItem
    }
  }
</script>
<style src="./calendar.styl" module/>

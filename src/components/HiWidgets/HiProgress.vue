<template>
  <div :class="$style.hiProgress" :style="{width: progress + '%'}"></div>
</template>
<script>
  export default {
    name: 'hi-progress',
    props: {
      progress: {
        type: Number,
        default: 0
      }
    }
  }
</script>
<style lang="stylus" module>
  $progress-color = #39b983

  .hi-progress
    fixed(top, left)
    z-index 10001
    background-color $progress-color
    height 3px
    transition width .5s
</style>

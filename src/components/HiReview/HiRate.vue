<template lang="pug">
  div(:class="$style.content", :style="scale && {transform: `scale(${scale})`}")
    span.iconfont.icon-star-full(v-for="i of 5", @click="$emit('activeRate', i)")
    div(:class="$style.wrapper", :style="{width: Math.ceil(this.rate * 2) * 10 + '%'}")
      span.iconfont.icon-star-full(v-for="j of 5", @click="$emit('activeRate', j)")
</template>
<script>
  import {REQUIRED_NUMBER} from 'utils'

  export default {
    props: {
      rate: REQUIRED_NUMBER,
      scale: Number
    }
  }
</script>
<style lang="stylus" module>
  .content
    relative()
    display inline-block
    > span
      color $remark-color

  .wrapper
    absolute(left top)
    overflow hidden
    white-space nowrap
    > span
      color $star-color

  .content, .wrapper
    > span
      transform scale(1)
</style>

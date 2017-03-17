<template lang="pug">
  div(:class="$style.empty")
    img(:src="img")
    br
    | {{text}}
    slot
</template>
<script>
  import empty from './empty.png'

  export default {
    name: 'hi-empty',
    props: {
      text: String,
      img: {
        type: String,
        default: empty
      }
    }
  }
</script>
<style lang="stylus" module>
  .empty
    color $remark-color
    text-align center
    padding-top 120px
    font-size 14px

    img
      width 160px
      margin-bottom 10px
</style>

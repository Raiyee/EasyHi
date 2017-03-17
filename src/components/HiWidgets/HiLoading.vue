<template lang="pug">
  div(:class="$style.hiLoading")
    div(:class="$style['hi-loading-' + theme]")
      template(v-if="theme === 'circle'")
        .circle-tip-area(:class="$style.circleTipArea")
          .circle-container(:class="$style.circleContainer")
            .circle(:class="$style[`${theme}`]", v-for="index in 4")
          .loading-text(:class="$style.loadingText")
    slot
</template>
<script>
  export default {
    name: 'hi-loading',
    props: {
      theme: {
        type: String,
        default: 'snake'
      }
    }
  }
</script>
<style lang="stylus" module>
  .hi-loading
    fixed(left)
    top 50%
    size 100%
    text-align center
    transform translate3d(0, -50%, 0)
    background-color rgba(0, 0, 0, .25)
    z-index 10000

  .hi-loading-snake
    animation hi-loading-snake-rotate .5s infinite linear
    border 4px solid rgb(204, 204, 204)
    border-right-color transparent
    border-radius 50%
    size 32px
    display inline-block
    middleCenter()

  .hi-loading-circle
    .circle-tip-area
      middleCenter(fixed)
      height 100px
      width 200px
      background $reverse-color
      border-radius 5px
      z-index 10000
      text-align center
      .circle-container
        absolute()
        top 30px
        left 50%
        height 13px
        width 13px
        animation hi-loading-circle-rotate 2s infinite ease
        .circle
          position absolute
          height 10px
          width 10px
          border-radius 100%
          animation hi-loading-circle-rotate1 2s infinite ease
          &:nth-child(1)
            top 0
            left 0
            background $loading-first
          &:nth-child(2)
            top 0
            left 100%
            background $loading-second
          &:nth-child(3)
            top 100%
            left 100%
            background $loading-third
          &:nth-child(4)
            top 100%
            left 0
            background $loading-forth
      .loading-text
        absolute()
        top 60px
        width 100%
        &:after
          content "加载中..."
          text-align center

  @keyframes hi-loading-snake-rotate
    from
      transform translate3d(-50%, -50%, 0) rotate(0deg)
    to
      transform translate3d(-50%, -50%, 0) rotate(1turn)

  @keyframes hi-loading-circle-rotate
    from
      transform translate3d(-50%, -50%, 0) rotate(-180deg)
    50%
      transform translate3d(-50%, -50%, 0) rotate(0deg) scale(1.5)
    to
      transform translate3d(-50%, -50%, 0) rotate(180deg) scale(1)

  @keyframes hi-loading-circle-rotate1
    from
      transform translate3d(-50%, -50%, 0) scale(1)
    50%
      transform translate3d(-50%, -50%, 0) scale(.75)
    to
      transform translate3d(-50%, -50%, 0) scale(1)
</style>

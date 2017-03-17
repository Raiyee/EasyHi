<template lang="pug">
  .scroll(:style="enable && {height: (height ? height : winHeight - 64 * rem) + 'px'}")
    slot
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'hi-scroll',
    props: {
      enable: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number
      }
    },
    computed: {
      ...mapGetters(['winHeight', 'rem'])
    }
  }
</script>

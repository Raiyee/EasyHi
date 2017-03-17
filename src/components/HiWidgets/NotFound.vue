<template lang="pug">
  hi-empty(:text="`未找到对应${initialized ? '路由' : '商户'}，请确认后重试！`", :img="require('./404.png')")
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'not-found',
    computed: {
      ...mapGetters(['initialized'])
    }
  }
</script>

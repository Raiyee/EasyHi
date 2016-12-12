<template src="./App.pug"/>
<script>
  import {mapGetters} from 'vuex'

  import HiLoading from 'components/HiLoading'
  import HiProgress from 'components/HiProgress'
  import HiModal from 'components/HiModal'

  export default {
    data: () => ({transition: 'bounce'}),
    computed: {
      ...mapGetters(['progress']),
      keepAlive() {
        let keepAlive = this.$route.meta.keepAlive
        return keepAlive == null || keepAlive
      }
    },
    components: {
      HiLoading,
      HiProgress,
      HiModal
    }
  }
</script>

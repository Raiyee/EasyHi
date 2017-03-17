<template lang="pug">
  #app.scroll
    hi-loading(v-if="progress && progress !== 100", theme="circle")
    hi-progress(v-if="showProgress && progress", :progress="progress")
    transition(:name="transition")
      keep-alive
        router-view(v-if="keepAlive")
    transition(:name="transition")
      router-view(v-if="!keepAlive")
    hi-modal#modal
    floating-menu
</template>
<script>
  import {mapGetters} from 'vuex'

  import HiLoading from 'components/HiWidgets/HiLoading'
  import HiProgress from 'components/HiWidgets/HiProgress'
  import HiModal from 'components/HiModal'
  import FloatingMenu from 'components/HiMenu/FloatingMenu'

  export default {
    name: 'app',
    data: () => ({transition: 'fade'}),
    computed: {
      ...mapGetters(['mode', 'progress', 'initialized']),
      keepAlive() {
        const {$route} = this
        const {keepAlive, init} = $route.meta
        return keepAlive == null ? !init : keepAlive
      },
      showProgress() {
        return !this.$util.isWechat || this.initialized
      }
    },
    components: {
      HiLoading,
      HiProgress,
      HiModal,
      FloatingMenu
    }
  }
</script>

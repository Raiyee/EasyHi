<template>
  <div id="app">
    <HiLoading v-if="progress"/>
    <HiProgress :progress="progress"/>
    <transition name="bounce">
      <keep-alive>
        <router-view v-if="keepAlive"/>
      </keep-alive>
      <router-view v-if="!keepAlive"/>
    </transition>
    <HiModal/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  import HiLoading from 'components/HiLoading'
  import HiProgress from 'components/HiProgress'
  import HiModal from 'components/HiModal'

  export default {
    computed: {
      ...mapGetters(['progress']),
      keepAlive() {
        let keepAlive = this.$route.meta.keepAlive
        keepAlive = keepAlive == null || keepAlive
        return keepAlive
      }
    },
    components: {
      HiLoading,
      HiProgress,
      HiModal
    }
  }
</script>

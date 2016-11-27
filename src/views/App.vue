<template>
  <div id="app">
    <HiLoading v-if="progress"/>
    <HiProgress :progress="progress"/>
    <transition :name="transition">
      <keep-alive>
        <router-view v-if="keepAlive"/>
      </keep-alive>
    </transition>
    <transition :name="transition">
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

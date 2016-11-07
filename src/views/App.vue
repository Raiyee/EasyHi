<template>
  <div id="app">
    <HiLoading v-if="progress"/>
    <HiProgress :progress="progress"/>
    <transition name="bounce">
      <keep-alive>
        <router-view v-if="keepAlive"/>
      </keep-alive>
    </transition>
    <transition name="bounce">
      <router-view v-if="!keepAlive"/>
    </transition>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  import {deleteItem} from 'utils'
  import {PERMISSION} from 'store/constants'

  import store from 'store'

  import HiLoading from 'components/HiLoading'
  import HiProgress from 'components/HiProgress'

  const theme = ['blue', 'green', 'purple', 'red'][~~(Math.random() * 4)]

  System.import('styles/theme-' + theme)

  const docEl = document.documentElement
  let resize, winHeight, winWidth

  addEventListener('resize', resize = () => {
    winHeight = docEl.clientHeight
    winWidth = docEl.clientWidth
    store.dispatch('setSize', {winHeight, winWidth})
    docEl.style.fontSize = store.getters.fontSize + 'px'
  }, false)

  resize()

  // 暂时添加一个退出登录的钩子
  window._logout_ = () => {
    store.dispatch('setEnv', {authorized: false, mobile: null})
    store.dispatch('resetRole')
    deleteItem(PERMISSION)
    location.reload()
  }

  export default {
    computed: {
      ...mapGetters(['progress']),
      keepAlive() {
        const keepAlive = this.$route.meta.keepAlive
        return keepAlive == null || keepAlive
      }
    },
    components:{
      HiLoading,
      HiProgress
    }
  }
</script>
<style src="styles/bootstrap" lang="styl"></style>
<style src="styles/app" lang="styl"></style>

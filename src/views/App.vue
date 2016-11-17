<template>
  <div id="app">
    <transition name="bounce">
      <keep-alive>
        <router-view v-if="keepAlive"/>
      </keep-alive>
      <router-view v-if="!keepAlive"/>
    </transition>
  </div>
</template>
<script>
  export default {
    data(){
      let keepAlive = this.$route.meta.keepAlive
      keepAlive = keepAlive == null || keepAlive
      return {
        keepAlive
      }
    }
  }
</script>
<style src="styles/bootstrap.styl" lang="stylus"/>
<style src="styles/app.styl" lang="stylus"/>

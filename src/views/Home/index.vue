<template>
  <div class="home">
    {{ msg }}
    <button class="btn btn-theme-primary">测试按钮</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: `I'm the home router view!`
      }
    }
  }
</script>
<style src="./index.styl" lang="stylus"/>

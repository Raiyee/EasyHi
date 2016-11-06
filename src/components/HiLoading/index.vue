<template>
  <div :class="[$style.hiLoading, className]">
    <div :class="$style['hi-loading-' + theme]"></div>
    <slot/>
  </div>
</template>
<script>
  import HiLoading from './index.common'

  export default {
    extends: HiLoading
  }
</script>
<style src="./index.css" module/>

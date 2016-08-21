<template>
  <div class="hi-loading" :class="className">
    <div :class="'hi-loading-' + theme"></div>
    <slot/>
  </div>
</template>
<script>
  // eslint-disable-next-line object-curly-spacing
  export default from './HiLoading.common';
</script>
<style src="./HiLoading.css" scoped/>

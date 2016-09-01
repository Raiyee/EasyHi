<template>
  <div class="hi-loading" :class="className">
    <div :class="'hi-loading-' + theme"></div>
    <slot/>
  </div>
</template>
<script>
  // eslint-disable-next-line object-curly-spacing
  export default from './index.common';
</script>
<style src="./index.css" scoped/>

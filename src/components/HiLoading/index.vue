<template>
  <div :class="[$style.hiLoading, className]">
    <div :class="$style['hi-loading-' + theme]"></div>
    <slot/>
  </div>
</template>
<script>
  export default {
    name: 'hi-loading',
    props: {
      className: {
        type: String,
        default: ''
      },
      theme: {
        type: String,
        default: 'snake'
      }
    }
  }
</script>
<style src="./index.styl" module/>

<template>
  <div :class="[$style.hiProgress, className]" :style="{width: progress + '%'}"></div>
</template>
<script>
  export default {
    name: 'hi-progress',
    props: {
      className: {
        type: String,
        default: ''
      },
      progress: {
        type: Number,
        default: 0
      }
    }
  }
</script>
<style src="./index.css" module/>

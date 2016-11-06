<template>
  <div :class="[$style.hiProgress, className]" :style="{width: progress + '%'}"></div>
</template>
<script>
  export default from './index.common'
</script>
<style src="./index.css" module/>

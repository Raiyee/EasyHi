<template>
  <div :class="[classes.hiProgress, className]" :style="{width: progress + '%'}"></div>
</template>
<script>
  import HiProgress from './index.common'
  import classes from './index.css'

  export default {
    extends: HiProgress,
    data: () => ({classes})
  }
</script>

<template>
  <div :class="[classes.hiLoading, className]">
    <div :class="classes['hi-loading-' + theme]"></div>
    <slot/>
  </div>
</template>
<script>
  import HiLoading from './index.common'
  import classes from './index.css'

  export default {
    extends: HiLoading,
    data: () => ({classes})
  }
</script>

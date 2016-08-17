<template>
  <div :class="['progress', className]"
       :style="{width: '' + progress + '%'}"></div>
</template>
<style scoped>
  .progress {
    position: fixed;
    z-index: 100001;
    top: 0;
    left: 0;
    background-color: #39b983;
    width: 100%;
    height: 0.2rem;
    transition: width 0.5s ease;
  }
</style>
<script>
  export default {
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
  };
</script>

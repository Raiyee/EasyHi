<template>
  <div :class="[classes.noItem, className]">
    <img src="./no-item.png">
    <br>
    {{text}}
  </div>
</template>
<script>
  import classes from '../NoItem/index.styl'

  export default {
    props: {
      text: String,
      className: String
    },
    data() {
      return {classes}
    }
  }
</script>

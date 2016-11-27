<template>
  <div :class="[$style.noItem, className]">
    <img src="./no-item.png">
    <br>
    {{text}}
  </div>
</template>
<script>
  export default {
    props: {
      text: String,
      className: String
    }
  }
</script>
<style src="../NoItem/index.styl" module/>

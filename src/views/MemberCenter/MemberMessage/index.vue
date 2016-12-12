<template src="./index.pug"/>
<script>
  export default {
    name: 'memberMessage',
    data() {
      return {
        ...this.$route.meta.data
      }
    }
  }
</script>
<style src="./index.styl" module/>

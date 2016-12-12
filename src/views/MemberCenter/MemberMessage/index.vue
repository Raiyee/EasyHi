<template src="./index.pug" lang="pug"/>
<script>
  export default {
    name: 'memberMessage',
    data() {
      return {
        classes: require('./index.styl'),
        ...this.$route.meta.data
      }
    }
  }
</script>

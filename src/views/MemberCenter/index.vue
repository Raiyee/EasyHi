<template src="./index.pug"/>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'member-center',
    data() {
      return {
        classes: require('./index.styl'),
        ...this.$route.meta.data
      }
    },
    computed: {
      ...mapGetters(['mobile'])
    }
  }
</script>

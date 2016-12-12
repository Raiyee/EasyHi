<template src="./index.pug"/>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'member-center',
    data() {
      return {
        ...this.$route.meta.data
      }
    },
    computed: {
      ...mapGetters(['mobile'])
    }
  }
</script>
<style src="./index.styl" module/>

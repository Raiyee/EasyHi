<template src="./index.pug"/>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'member-index',
    computed: {
      ...mapGetters(['winHeight'])
    },
    methods: {
      animationEnd(e) {
        this.$util.removeClass(e.target, 'animated')
      }
    }
  }
</script>
<style src="./index.styl" module/>

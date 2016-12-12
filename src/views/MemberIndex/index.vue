<template src="./index.pug"/>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'member-index',
    data: () => ({
      classes: require('./index.styl')
    }),
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

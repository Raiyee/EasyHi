<template src="./index.pug"/>
<script>
  export default {
    name: 'hi-loading',
    props: {
      className: {
        type: String,
        default: ''
      },
      theme: {
        type: String,
        default: 'snake'
      }
    }
  }
</script>
<style src="./index.styl" module/>

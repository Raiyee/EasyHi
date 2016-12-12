<template src="./modal-item.pug"/>
<script>
  import {isEmptyStr, warn, error} from 'utils'

  export default {
    props: {
      id: [Number, String],
      header: [Boolean, String],
      footer: Boolean,
      transition: [Boolean, String],
      close: Function,
      confirm: Function,
      confirmText: String,
      cancelText: String
    },
    computed: {
      label() {
        const header = this.header
        return isEmptyStr(header) ? '&nbsp;' : header
      }
    },
    methods: {
      closeModal() {
        this.close ? this.close.apply(this, arguments)
          : this.$modal.close(this.id || warn('there is no modal id found, then the current modal will be close!'))
      },
      confirmModal() {
        this.confirm ? this.confirm.apply(this, arguments)
          : error('you should handle the click event on the confirm btn by yourself!')
      }
    }
  }
</script>
<style src="./modal-item.styl" module/>

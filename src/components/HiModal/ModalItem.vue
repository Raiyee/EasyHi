<template src="./modal-item.pug"/>
<script>
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
        return this.$util.isEmptyStr(header) ? '&nbsp;' : header
      }
    },
    methods: {
      closeModal() {
        this.close ? this.close.apply(this, arguments)
          : this.$modal.close(this.id || this.$util.warn('there is no modal id found, then the current modal will be close!'))
      },
      confirmModal() {
        this.confirm ? this.confirm.apply(this, arguments)
          : this.$util.error('you should handle the click event on the confirm btn by yourself!')
      }
    }
  }
</script>
<style src="./modal-item.styl" module/>

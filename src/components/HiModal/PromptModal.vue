<template src="./prompt-modal.pug"/>
<script>
  import ModalItem from 'components/HiModal/ModalItem'
  import $style from './prompt-modal.styl'

  export default {
    name: 'prompt',
    props: {
      tipText: String,
      confirm: Function,
      close: Function,
      confirmText: String,
      cancelText: String,
      type: Number,
      timeout: Number,
      transition: [Boolean, String],
      promptText: String,
      placeholder: String
    },
    data() {
      return {
        text: this.promptText
      }
    },
    beforeCreate() {
      this.$style = $style
    },
    mounted() {
      this.type || setTimeout(() => {
        this.closeModal()
      }, this.timeout || 2000)
    },
    methods: {
      closeModal() {
        this.close ? this.close.apply(this, arguments) : this.$modal.close()
      },
      confirmModal() {
        this.confirm ? this.confirm.apply(this, this.type === 3 ? [this.text, ...arguments] : arguments)
          : this.$util.error('you should handle the click event on the confirm btn by yourself!')
      }
    },
    components: {
      ModalItem
    }
  }
</script>
<!--<style src="./prompt-modal.styl" module/>-->

<template>
  <modal-item :class="$style.prompt" :transition="transition">
    <template v-if="type === 3">
      <div slot="header" class="modal-title">{{ tipText }}</div>
      <div slot="body" :class="$style.promptText">
        <textarea v-model="text" :placeholder="placeholder"/>
      </div>
    </template>
    <div v-else slot="body" class="modal-body" v-html="tipText || '系统消息'"/>
    <template v-if="type" slot="footer">
      <div v-if="type - 1" :class="$style.btnPrompt" @click="closeModal">{{ cancelText || '取消' }}</div>
      <div class="theme-color" :class="$style.btnPrompt" @click="confirmModal">{{ confirmText || '确定' }}</div>
    </template>
  </modal-item>
</template>
<script>
  import {error} from 'utils'

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
          : error('you should handle the click event on the confirm btn by yourself!')
      }
    },
    components: {
      ModalItem
    }
  }
</script>
<!--<style src="./prompt-modal.styl" module/>-->

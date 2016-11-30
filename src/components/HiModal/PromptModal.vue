<template>
  <modal-item
    :class="$style.prompt"
    :transition="transition">
    <template v-if="type === 3">
      <div class="modal-title" slot="header">{{ tipText }}</div>
      <div :class="$style.promptText" slot="body">
        <textarea v-model="text" :placeholder="placeholder"/>
      </div>
    </template>
    <template slot="body" v-else>
      <div class="modal-body" v-html="tipText || '系统消息'"/>
    </template>
    <template slot="footer" v-if="type">
      <div :class="$style.btnFooter" @click="closeModal" v-if="type - 1">{{ cancelText || '取消' }}</div>
      <div :class="$style.btnFooter" class="theme-color" @click="confirmModal">{{ confirmText || '确定' }}</div>
    </template>
  </modal-item>
</template>
<script>
  import {error} from 'utils'

  import ModalItem from 'components/HiModal/ModalItem'

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
<style src="./prompt-modal.styl" module/>

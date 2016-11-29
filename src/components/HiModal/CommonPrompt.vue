<template>
  <PromptModal
    :class="$style.commonPrompt"
    :transition="transition"
    :confirmText="confirmText"
    :confirm="confirm"
    :cancelText="cancelText"
    :close="close">
    <span v-html="tipText"/>
    <template slot="footer"  v-if="type !== 2">
      <div class="btn-footer" @click="closeModal" v-if="type === 0">{{ cancelText }}</div>
      <div class="btn-footer theme-color" @click="confirmModal">{{ confirmText }}</div>
    </template>
  </PromptModal>
</template>
<script>
  import PromptModal from 'components/HiModal/ModalBase'

  export default {
    props: {
      tipText: String,
      confirm: Function,
      close: Function,
      confirmText: String,
      cancelText: String,
      type: Number,
      timeout: Number,
      transition: String
    },
    mounted() {
      this.type === 2 && setTimeout(() => {
        this.closeModal()
      }, this.timeout || 2000)
    },
    methods: {
      closeModal() {
        this.close ? this.close() : this.$modal.close()
      },
      confirmModal() {
        this.confirm && this.confirm()
      }
    },
    components: {
      PromptModal
    }
  }
</script>
<style src="./common-prompt.styl" module/>

<template>
  <PromptModal
    :class="$style.commonPrompt"
    :transition="transition"
    :confirmText="confirmText"
    :confirm="confirm"
    :cancelText="cancelText"
    :close="close">
    <span v-html="tipText"/>
    <template slot="footer" v-if="type !== 2">
      <div v-if="type === 1" class="theme-color btn-footer" @click="confirmModal">
        {{ confirmText }}
      </div>
      <template v-else>
        <div class="btn-footer" @click="closeModal">{{ cancelText }}</div>
        <div class="btn-footer theme-color" @click="confirmModal">{{ confirmText }}</div>
      </div>
    </template>
  </PromptModal>
</template>
<script>
  import PromptModal from 'components/HiModal/ModalBase'
  import {isBoolean, isString} from 'utils'

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

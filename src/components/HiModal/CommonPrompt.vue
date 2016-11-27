<template>
  <PromptModal
    :class="$style.commonPrompt"
    :header="header"
    :transition="transition"
    :confirmText="confirmText"
    :cancelText="cancelText"
    :footer="footer">
    <span v-html="tipText"/>
    <template slot="footer" v-if="!isToast">
        <div v-if="isTip" class="theme-color btn-footer btn-footer-confirm" @click="confirmModal">
          {{ confirmText }}
        </div>
        <div class="modal-base-footer" v-else>
          <div class="btn-footer btn-cancel" @click="closeModal">{{ cancelText }}</div>
          <div class="theme-color btn-footer" @click="confirmModal">{{ confirmText }}</div>
        </div>
    </template>
  </PromptModal>
</template>
<script>
  import PromptModal from 'components/HiModal/ModalBase'
  export default {
    props: {
      header: String,
      footer: Boolean,
      tipText: String,
      confirm: Function,
      cancel: Function,
      confirmText: String,
      cancelText: String,
      isTip: Boolean,
      isToast: Boolean,
      timeout: Number,
      remove: Function,
      transition: String
    },
    mounted() {
      this.isToast && setTimeout(function () {
        this.$modal.close()
        this.remove && this.remove()
      }.bind(this), this.timeout)
    },
    methods: {
      closeModal() {
        this.cancel && this.cancel()
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
<style src='./common-prompt.styl' lang='styl' module/>

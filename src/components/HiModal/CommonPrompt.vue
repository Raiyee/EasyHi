<template>
  <PromptModal
    :class="$style.commonPrompt"
    :header="header"
    :footer="footer"
    :transition="transition"
    :confirmText="confirmText"
    :confirm="confirm"
    :cancelText="cancelText"
    :close="close">
    <span v-html="tipText"/>
    <template slot="footer" v-if="type!=2">
        <div v-if="type==1" class="theme-color btn-footer btn-footer-confirm" @click="confirmModal">
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
  import {isBoolean, isString} from 'utils'

  export default {
    props: {
      header: {validator: header => isBoolean(header) || isString(header)},
      footer: Boolean,
      tipText: String,
      confirm: Function,
      cancel: Function,
      confirmText: String,
      cancelText: String,
      type: Number,
      timeout: Number,
      remove: Function,
      transition: String
    },
    mounted() {
      this.type === 2 && setTimeout(function () {
        this.close()
      }.bind(this), this.timeout)
    },
    methods: {
      closeModal() {
        this.close()
      },
      close() {
        this.cancel && this.cancel()
        this.remove && this.remove()
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

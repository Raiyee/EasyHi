<template>
  <PromptModal
    :class="xxxx"
    :header="header"
              :footer="true"
              :_confirm="_confirm.bind(this)"
              :_close="_close.bind(this)"
              :remove="remove.bind(this)"
              :transition="transition"
              :isTip="isTip"
              :isToast="isToast"
              :timeout="timeout"
              :confirmText="confirmText"
              :cancelText="cancelText"
              :id="id">
     <span v-html="tipText"/>
  </PromptModal>
</template>
<script>
  import PromptModal from 'components/HiModal/PromptModal'
  import classes from './commonPrompt.styl'

  export default {
    props: {
      id: String,
      header: String,
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
    data() {
      return {
        classes
      }
    },
    methods: {
      _close() {
        this.cancel && this.cancel()
      },
      _confirm() {
        this.confirm && this.confirm()
      }
    },
    components: {
      PromptModal
    }
  }
</script>

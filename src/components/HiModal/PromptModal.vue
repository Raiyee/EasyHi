<template>
  <PromptModal
    :class="$style.commonPrompt"
    :transition="transition">
    <template slot="body">
      <div class="modal-body" :class="type === 3 ? 'confirm-header' : ''" v-html="tipText || '系统消息'"/>
      <textarea v-if="type === 3" v-model="reason" class="confirm-reason"
                placeholder="在此填写原因(50字以内)，或者直接点击“确定”"/>
    </template>
    <template slot="footer" v-if="type">
      <div class="btn-footer" @click="closeModal" v-if="type - 1">{{ cancelText || '取消' }}</div>
      <div class="btn-footer theme-color" @click="confirmModal">{{ confirmText || '确定' }}</div>
    </template>
  </PromptModal>
</template>
<script>
  import {error} from 'utils'

  import PromptModal from 'components/HiModal/ModalBase'

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
      transition: [Boolean, String]
    },
    data() {
      return {
        reason: 'text'
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
        this.confirm ? this.confirm.apply(this, this.type === 3 ? [this.reason, ...arguments] : arguments)
          : error('you should handle the click event on the confirm btn by yourself!')
      }
    },
    components: {
      PromptModal
    }
  }
</script>
<style src="./prompt-modal.styl" module/>

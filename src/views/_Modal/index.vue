<template>
  <div>
    <button class="btn btn-theme-primary" @click="addModal">Add modal</button>
    <button class="btn btn-theme-default" @click="clearModal">Clear modal</button>
    <button class="btn btn-theme-default" @click="confirmModal">Confirm modal</button>
    <button class="btn btn-theme-default" @click="tipModal">Tip modal</button>
    <button class="btn btn-theme-default" @click="toastModal">Toast modal</button>
    <button class="btn btn-theme-default" @click="promptModal">edit confirm modal</button>
    <div class="theme-color" v-html="promptText"></div>
  </div>
</template>
<script>
  import {confirm, tip, toast, prompt} from 'utils'

  let modalId

  export default {
    data() {
      return {
        options: {
          backdrop: false,
          show: true,
          destroy: true
        },
        promptText: ''
      }
    },
    methods: {
      addModal() {
        modalId = this.$modal.open({
          id: modalId,
          component: System.import('./ActualModal'),
          options: this.options,
          props: {
            bodyMsg: 'Just test body',
            transition: true
          }
        })
      },
      clearModal() {
        this.$modal.clear()
      },
      confirmModal() {
        confirm({
          tipText: '测试confirm 模态框',
          confirmText: '蓝瘦,香菇',
          confirm() {
            console.log('It is after confirm btn')
            this.$modal.close()
          },
          close() {
            console.log('It is after cancel modal')
            this.$modal.close()
          }
        })
      },
      tipModal() {
        tip({
          tipText: 'I am  a confirm <span style="color: red">red</span> modal tip Text',
          confirm() {
            this.$modal.close()
          }
        })
      },
      toastModal() {
        toast({
          tipText: 'I am  a confirm modal tip Text',
          close() {
            console.log('It is a toast')
            this.$modal.close()
          }
        })
      },
      promptModal() {
        prompt({
          tipText: '还不赶紧写原因？',
          promptText: this.promptText,
          placeholder: '在此填写原因(50字以内)，或者直接点击"确定"',
          confirm: promptText => {
            this.promptText = promptText
            this.$modal.close()
          }
        })
      }
    }
  }
</script>

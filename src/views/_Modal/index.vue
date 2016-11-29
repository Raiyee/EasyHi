<template>
  <div>
    <button class="btn btn-theme-primary" @click="addModal">Add modal</button>
    <button class="btn btn-theme-default" @click="clearModal">Clear modal</button>
    <button class="btn btn-theme-default" @click="confirmModal">Confirm modal</button>
    <button class="btn btn-theme-default" @click="tipModal">Tip modal</button>
    <button class="btn btn-theme-default" @click="toastModal">Toast modal</button>
    <button class="btn btn-theme-default" @click="confirmReason">edit confirm modal</button>
    <div class="theme-color" v-html="reason"></div>
  </div>
</template>
<script>
  import {confirm, tip, toast, confirmReason} from 'utils'

  let modalId

  export default {
    data() {
      return {
        options: {
          backdrop: false,
          show: true,
          destroy: true
        },
        reason: ''
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
      confirmReason() {
        confirmReason({
          tipText: '还不赶紧写原因？',
          confirm: reason => {
            console.log(this.reason = reason)
            this.$modal.close()
          }
        })
      }
    }
  }
</script>

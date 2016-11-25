<template>
  <div>
    <button class="btn btn-theme-primary" @click="addModal">Add modal</button>
    <button class="btn btn-theme-default" @click="clearModal">Clear modal</button>
    <button class="btn btn-theme-default" @click="confirmModal">Confirm modal</button>
    <button class="btn btn-theme-default" @click="tipModal">Tip modal</button>
    <button class="btn btn-theme-default" @click="toastModal">Toast modal</button>
  </div>
</template>
<script>
  import {confirmOn, tipOn, toastOn} from 'utils'
  let modalId

  export default {
    data() {
      return {
        options: {
          backdrop: false,
          transition: 'bounce',
          show: true
        }
      }
    },
    methods: {
      addModal() {
        modalId = this.$modal.open({
          id: modalId,
          component: System.import('./ActualModal'),
          options: this.options,
          props: {
            bodyMsg: 'Just test body'
          }
        })
      },
      clearModal() {
        this.$modal.clear()
      },
      confirmModal() {
        modalId = confirmOn({
          tipText: '测试confirm 模态框',
          confirmText: '蓝瘦,香菇23333333333',
          confirm() {
            console.log('It is after confirm btn')
            this.$modal.close(modalId)
          },
          cancel() {
            console.log('It is after cancel modal')
          }
        })
      },
      tipModal() {
        modalId = tipOn({
          tipText: 'I am  a confirm modal tip Text',
          confirm() {
            console.log('It is after tip modal')
            this.$modal.close(modalId)
          }
        })
      },
      toastModal() {
        modalId = toastOn({
          tipText: 'I am  a confirm modal tip Text',
          remove() {
            console.log('It is a toast')
          },
          timeout: 2000
        })
      }
    }
  }
</script>

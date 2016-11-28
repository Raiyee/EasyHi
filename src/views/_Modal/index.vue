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
          show: true,
          destroy: true
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
            bodyMsg: 'Just test body',
            transition: 'bounce'
          }
        })
      },
      clearModal() {
        this.$modal.clear()
      },
      confirmModal() {
        confirmOn({
          tipText: '测试confirm 模态框',
          confirmText: '蓝瘦,香菇23333333333',
          confirm() {
            console.log('It is after confirm btn')
            this.$modal.close()
          },
          cancel() {
            console.log('It is after cancel modal')
            this.$modal.close()
          }
        })
      },
      tipModal() {
        tipOn({
          tipText: 'I am  a confirm modal tip Text',
          confirm() {
            console.log('It is after tip modal')
            this.$modal.close()
          }
        })
      },
      toastModal() {
        toastOn({
          tipText: 'I am  a confirm modal tip Text',
          remove() {
            console.log('It is a toast')
            this.$modal.close()
          },
          timeout: 5000
        })
      }
    }
  }
</script>

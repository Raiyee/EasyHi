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
          tipText: 'I am  a confirm modal tip Text',
          confirmBtn: '蓝瘦',
          afterConfirm() {
            console.log('It is after confirm modal')
            this.$modal.close(modalId)
          },
          afterCancel() {
            console.log('It is after cancel modal')
          }
        })
      },
      tipModal() {
        modalId = tipOn({
          tipText: 'I am  a confirm modal tip Text',
          afterConfirm() {
            console.log('It is after tip modal')
            this.$modal.close(modalId)
          }
        })
      },
      toastModal() {
        modalId = toastOn('I am  a confirm modal tip Text', function () {
          console.log('It is a toast')
        }, 2000)
      }
    }
  }
</script>

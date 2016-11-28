<template>
  <ModalItem :header="'标题'"
             :footer="true"
             :confirm="confirm.bind(this)"
             :transition="transition">
    <template slot="header">
      My Header
    </template>
    <template>
      <p>{{ bodyMsg }}</p>
      {{ msg }}
      <br>
      <button class="btn btn-theme-primary" @click="reverseMsg">Reverse Msg</button>
    </template>
    <!--<template slot="footer">-->
    <!--<button class="btn btn-theme-default" @click="close">Close</button>-->
    <!--</template>-->
  </ModalItem>
</template>
<script>
  import ModalItem from 'components/HiModal/ModalItem'
  import {reverse} from 'utils'

  let modalId

  export default {
    props: {
      bodyMsg: {
        type: String,
        required: true
      },
      transition: String
    },
    data() {
      return {msg: 'My name is msg'}
    },
    components: {
      ModalItem
    },
    methods: {
//      close() {
//        this.$modal.close(modalId)
//      },
      confirm() {
        modalId = this.$modal.open({
          id: modalId,
          component: System.import('./ActualModal'),
          options: {
            backdrop: true,
            destroy: true,
            show: true
          },
          props: {
            bodyMsg: reverse(this.bodyMsg),
            transition: this.transition
          }
        })
      },
      reverseMsg() {
        this.msg = reverse(this.msg)
      }
    }
  }
</script>

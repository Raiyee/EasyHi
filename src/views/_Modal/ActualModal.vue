<template>
  <ModalItem :header="'标题'"
             :footer="true"
             :confirm="confirm.bind(this)"
             transition="bounce"
  >
    <template slot="header">
      My Header
    </template>
    <template>
      <p>Just test body</p>
      {{ reverse ? $options.filters.reverse(msg) : msg }}
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
  let modalId

  export default {
    props: {
      id: false,
      props: Object
    },
    data() {
      return {msg: 'My name is msg', reverse: false}
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
          }
        })
      },
      reverseMsg() {
        this.reverse = !this.reverse
      }
    }
  }
</script>

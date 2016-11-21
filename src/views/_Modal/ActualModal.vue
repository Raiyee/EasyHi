<template>
  <ModalItem :id="id" :header="'标题'" :footer="true" :confirm="confirm.bind(this)">
    <template slot="header">
      My Header
    </template>
    <template>
      <p>Just test body</p>
      xxxx
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
      return {test: true}
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
            fade: true,
            show: true
          }
        })
      }
    }
  }
</script>

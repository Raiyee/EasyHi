<template>
  <ModalItem :id="id" :header="'标题'" :footer="true" :confirm="confirm.bind(this)">
    <template slot="body">
      <p>One fine body&hellip;</p>
      xxxx
    </template>
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

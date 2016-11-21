<template>
  <div>
    <button class="btn btn-theme-primary" @click="addModal">Add modal</button>
    <button class="btn btn-theme-default" @click="clearModal">Clear modal</button>
  </div>
</template>
<script>
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
          options: this.options
        })
      },
      clearModal() {
        this.$modal.clear()
      }
    }
  }
</script>

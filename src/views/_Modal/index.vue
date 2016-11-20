<template>
  <div>
    <button class="btn btn-theme-primary" @click="addModal">Add modal</button>
    <button class="btn btn-theme-default" @click="clearModal">Clear modal</button>
  </div>
</template>
<script>
  export default {
    methods: {
      addModal() {
        this.$modal.add(System.import('./ActualModal'))
      },
      clearModal() {
        this.$modal.clear()
      }
    }
  }
</script>

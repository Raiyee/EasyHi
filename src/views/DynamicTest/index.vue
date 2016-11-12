<template>
  <dynamic :comps="comps" :emptyView="emptyView"/>
</template>
<script>
  import NoItem from 'components/NoItem'

  export default {
    name: 'VueDynamic',
    data() {
      return {
        comps: this.$route.meta.data,
        emptyView: NoItem
      }
    }
  }
</script>

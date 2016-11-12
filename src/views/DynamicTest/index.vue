<template>
  <Dynamic :comps="comps" :emptyView="emptyView"/>
</template>
<script>
  import Dynamic from 'vue-dynamic/lib/Dynamic'
  import NoItem from 'components/NoItem'

  export default {
    name: 'VueDynamic',
    data() {
      return {
        comps: this.$route.meta.data,
        emptyView: NoItem
      }
    },
    components: {
      Dynamic
    }
  }
</script>

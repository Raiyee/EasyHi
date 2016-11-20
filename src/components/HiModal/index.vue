<template>
  <div>
    <div class="modal-backdrop" v-if="show"></div>
    <component v-for="modal of modals" :is="modal"/>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapActions, mapGetters} from 'vuex'

  import {isPromise} from 'utils'

  export default {
    beforeCreate() {
      __DEV__ ? (Vue.prototype.$modal = this) : Object.defineProperty(Vue.prototype, '$modal', {
        value: this,
        readable: true,
        writable: false
      })
    },
    data() {
      return {
        show: false,
        modals: []
      }
    },
    computed: {
      ...mapGetters(['modalIds'])
    },
    methods: {
      ...mapActions(['addModal', 'clearModal']),
      actualAdd(modal) {
        console.log(modal)
        this.modals.push(modal)
      },
      add(modal) {
        isPromise(modal) ? modal.then(modal => this.actualAdd(modal)) : this.actualAdd(modal)
      },
      clear() {
        this.modals = []
      }
    }
  }
</script>

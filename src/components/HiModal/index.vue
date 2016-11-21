<template>
  <div v-if="modals.length">
    <div class="modal-backdrop"
         :class="{fade: currModal.options.fade, in: currModal.options.fade && currModal.options.in}"
         v-if="currModal && currModal.options.backdrop"></div>
    <component v-for="{id, component, options, props} of modals"
               :class="{fade: options.fade, in: options.fade && options.in}"
               :id="id"
               :props="props"
               :is="component"
               :style="{display: options.show ? 'block' : 'none'}"
    />
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapActions, mapGetters} from 'vuex'

  import {addClass, isPromise, pickObj, removeClass} from 'utils'

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
        modals: [],
        currModal: null
      }
    },
    computed: {
      ...mapGetters(['modalIds'])
    },
    watch: {
      currModal(newModal) {
        (newModal ? addClass : removeClass)(document.body, 'modal-open')
      }
    },
    methods: {
      ...mapActions(['addModal', 'clearModal']),
      clear() {
        this.modals = []
      },
      close(modalId) {
        const currModalId = this.currModal && this.currModal.id
        let modal
        const index = this.modals.findIndex(m => m.id === modalId || m.id === currModalId);
        index === -1 || (modal = this.modals[index])
        modalId === currModalId && (this.currModal = null)
        if (modal) {
          const {options} = modal
          if (options.destroy) return this.modals.splice(index, 1)
          options.show = false
          options.in = false
        }
      },
      modalFade(modal) {
        this.currModal && this.currModal.id === modal.id || this.close()
        const {options} = modal
        options.fade && setTimeout(() => this.$set(options, 'in', true), 0)
        options.show && (this.currModal = modal)
      },
      actualAdd(modal) {
        const m = this.modals.find(m => m.id === modal.id)
        if (m) {
          this.modalFade(modal)
          Object.assign(m, modal)
          return
        }
        this.modalFade(modal)
        this.modals.push(modal)
      },
      open(modal: {id: void | string | number, component: Object, options: void | Object}) {
        modal.id = modal.id || 'modal_' + +new Date()
        modal.options = pickObj(modal.options, ['backdrop', 'destroy', 'fade', 'show'])
        isPromise(modal.component)
          ? modal.component.then(component => this.actualAdd(Object.assign(modal, {component}))) : this.actualAdd(modal)
        return modal.id
      }
    }
  }
</script>

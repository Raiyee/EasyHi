<template>
  <div v-if="modals.length">
    <div class="modal-backdrop in"
         v-if="currModal && currModal.options.backdrop"></div>
    <template v-for="modal of modals">
      <transition v-if="modal.options.transition"
                  :name="modal.options.transition">
        <component :id="modal.id"
                   :is="modal.component"
                   :key="modal.id"
                   :props="modal.props"
                   style="display: block"
                   v-show="modal.options.show"/>
      </transition>
      <component v-else
                 :id="modal.id"
                 :is="modal.component"
                 :key="modal.id"
                 :props="modal.props"
                 :style="{display: modal.options.show ? 'block' : 'none'}"/>
    </template>
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
        const index = this.modals.findIndex(m => m.id === (modalId || currModalId))
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
      open(modal: {id: void | string | number, component: Object, options: void | Object, props: void | Object}) {
        modal.id = modal.id || 'modal_' + +new Date()
        modal.options = pickObj(modal.options, ['backdrop', 'destroy', 'show', 'transition'])
        isPromise(modal.component)
          ? modal.component.then(component => this.actualAdd(Object.assign(modal, {component}))) : this.actualAdd(modal)
        return modal.id
      }
    }
  }
</script>

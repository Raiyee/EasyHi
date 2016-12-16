import Vue from 'vue'

import {addClass, isPromise, pickObj, removeClass, ensure, TIP_ID} from 'utils'

export default require('./index.pug')({
  beforeCreate() {
    Object.defineProperty(Vue.prototype, '$modal', {
      value: this,
      readable: true,
      writable: __DEV__
    })
  },
  data() {
    return {
      currModal: null,
      modals: []
    }
  },
  computed: {
    currModalId() {
      return this.currModal && this.currModal.id
    }
  },
  watch: {
    currModal: modal => (modal ? addClass : removeClass)(document.body, 'modal-open')
  },
  methods: {
    clear() {
      this.modals = []
    },
    close(modalId) {
      modalId = modalId || this.currModalId
      if (!modalId) return
      let modal
      const index = this.modals.findIndex(m => m.id === modalId)
      index === -1 || (modal = this.modals[index])
      if (!modal) return
      const {options, props} = modal
      options.show = false
      if (!options.destroy) return
      props && props.transition ? ensure(this.$refs.modal[index].$el, 'animationend transitionend', () => {
        this.removeModal(modalId)
      }) : this.removeModal(modalId)
    },
    removeModal(modalId) {
      modalId === this.currModalId && (this.currModal = null)
      this.modals.splice(this.modals.findIndex(m => m.id === modalId), 1)
    },
    mount(modal) {
      const modalId = modal.id
      const m = this.modals.find(m => m.id === modalId)
      m ? (modal = Object.assign(m, modal)) : this.modals.push(modal)
      const currModalId = this.currModalId
      if (currModalId && modalId === TIP_ID) return
      currModalId === modalId || this.close()
      modal.options.show && (this.currModal = modal)
    },
    open(modal: {id: void | string | number | Symbol,
      component: Object,
      options: void | Object,
      props: void | Object}) {
      modal.id = modal.id || 'modal_' + +new Date()
      modal.options = pickObj(modal.options, ['backdrop', 'destroy', 'show'])
      isPromise(modal.component)
        ? modal.component.then(component => this.mount(Object.assign(modal, {component}))) : this.mount(modal)
      return modal.id
    }
  }
})

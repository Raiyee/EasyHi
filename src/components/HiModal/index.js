import Vue from 'vue'

import {addClass, isPromise, removeClass, ensure, warn, TIP_ID} from 'utils'

export default require('./index.pug')({
  name: 'hi-modal',
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
    backdrop() {
      return this.currModal && this.currModal.options.backdrop
    },
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
    close(modalId, destroy) {
      modalId = modalId || this.currModalId
      if (!modalId) return
      const index = this.getModalIndex(modalId)
      if (index === -1) return
      const modal = this.modals[index]
      const {options} = modal
      options.show = false
      const callback = () => {
        options.destroy || destroy ? this.removeModal(modalId) : this.resetCurrModal(modalId)
      }
      const modalRef = this.$refs.modal[index]
      const modalItem = modalRef.$children[0]
      modalItem || warn(`this modal is not a Vue component, HiModal will not respect it's transition`)
      const propsData = modalItem && modalItem.$options.propsData
      propsData && propsData.transition
        ? ensure(modalRef.$el, 'animationend transitionend', callback) : callback()
    },
    resetCurrModal(modalId) {
      modalId === this.currModalId && (this.currModal = null)
    },
    removeModal(modalId) {
      this.modals.splice(this.modals.findIndex(m => m.id === modalId), 1)
      this.resetCurrModal(modalId)
    },
    getModalIndex(modalId) {
      return this.modals.findIndex(m => m.id === modalId)
    },
    mount(modal) {
      const modalId = modal.id
      const m = this.modals.find(m => m.id === modalId)
      const component = modal.component
      const options: void | {backdrop: void | boolean | 'static' | 'transparent'} = modal.options
      const props = modal.props
      if (m) {
        Object.assign(m.props, props)
        Object.assign(m.options, options)
        component && (m.component = component)
        modal = m
      } else {
        if (!component) throw new ReferenceError('no component passed on initialization')
        modal.options = {...options}
        modal.props = {...props}
        this.modals.push(modal)
      }
      const currModalId = this.currModalId
      if (currModalId && modalId === TIP_ID) return (modal.props.backdrop = !this.currModal.options.backdrop)
      currModalId === modalId || this.close()
      modal.options.show && (this.currModal = modal)
    },
    open(modal: {id: void | string | number, component: void | Object, options: void | Object, props: void | Object}) {
      modal.id = modal.id || 'modal_' + +new Date()
      isPromise(modal.component)
        ? modal.component.then(component => this.mount(Object.assign(modal, {component}))) : this.mount(modal)
      return modal.id
    },
    toggle() {
      if (this.backdrop === 'static') return
      const close = this.currModal.props.close
      close ? close.apply(this.$refs.modal[this.getModalIndex(this.currModalId)], arguments) : this.close()
    }
  }
})

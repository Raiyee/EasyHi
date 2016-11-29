<template>
  <div v-if="modals.length">
    <div :class="[$style.mask, $style.in]" v-if="currModal && currModal.options.backdrop"></div>
    <component v-for="{component, id, props, options} of modals"
               :is="component"
               :key="id"
               ref="modal"
               v-bind="props"
               style="display: block"
               v-show="options.show"/>
  </div>
</template>
<script>
  import Vue from 'vue'

  import {addClass, isPromise, pickObj, removeClass, on} from 'utils'

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
    watch: {
      currModal: modal => (modal ? addClass : removeClass)(document.body, 'modal-open')
    },
    methods: {
      clear() {
        this.modals = []
      },
      close(modalId) {
        const currModalId = this.currModal && this.currModal.id
        modalId = modalId || currModalId
        if (!modalId) return

        let modal
        const index = this.modals.findIndex(m => m.id === modalId)
        index === -1 || (modal = this.modals[index])
        modalId === currModalId && (this.currModal = null)
        if (!modal) return
        const {options, props} = modal
        options.show = false
        if (!options.destroy) return
        props && props.transition ? on(this.$refs.modal[index].$el, 'animationend transitionend', () => {
          this.modals.splice(index, 1)
        }) : this.modals.splice(index, 1)
      },
      mount(modal) {
        const m = this.modals.find(m => m.id === modal.id)
        m ? (modal = Object.assign(m, modal)) : this.modals.push(modal)
        this.currModal && this.currModal.id === modal.id || this.close()
        modal.options.show && (this.currModal = modal)
      },
      open(modal: {id: void | string | number, component: Object, options: void | Object, props: void | Object}) {
        modal.id = modal.id || 'modal_' + +new Date()
        modal.options = pickObj(modal.options, ['backdrop', 'destroy', 'show'])
        isPromise(modal.component)
          ? modal.component.then(component => this.mount(Object.assign(modal, {component}))) : this.mount(modal)
        return modal.id
      }
    }
  }
</script>
<style src="./index.styl" module/>

<template>
  <transition :name="transition">
    <div :class="$style.modalBase">
      <div class="modal-base-dialog">
        <div class="modal-base-content">
          <div class="modal-base-header" v-if="$slots.header">
            <slot name="header"/>
          </div>
          <!--body-->
          <div class="modal-base-body">
            <slot/>
          </div>
          <!--footer-->
          <div class="modal-base-footer" v-if="$slots.footer">
            <slot name="footer"/>
          </div>
          <div class="modal-base-footer" v-if="footer">
            <div class="btn-footer btn-cancel" @click="closeModal">{{ cancelText }}</div>
            <div class="theme-color btn-footer" @click="confirmModal">{{ confirmText }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {isBoolean, isString, warn} from 'utils'

  export default {
    props: {
      header: {validator: header => isBoolean(header) || isString(header)},
      footer: Boolean,
      transition: String,
      close: Function,
      confirm: Function,
      confirmText: String,
      cancelText: String
    },
    methods: {
      closeModal() {
        this.close ? this.close.apply(this, arguments)
          : this.$modal.close(this.id || warn('there is no modal id found, then the current modal will be close!'))
      },
      confirmModal() {
        this.confirm && this.confirm.apply(this, arguments)
      }
    }
  }
</script>

<style src='./modal-base.styl' lang="styl" module/>

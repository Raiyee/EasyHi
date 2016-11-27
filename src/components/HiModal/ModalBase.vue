<template>
  <transition :name="transition || 'bounce'">
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
            <div class="btn-footer btn-cancel" @click="closeModal">{{ cancelText || '取消' }}</div>
            <div class="theme-color btn-footer" @click="confirmModal">{{ confirmText || '确定' }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {isBoolean, isString} from 'utils'

  export default {
    props: {
      header: {validator: header => isBoolean(header) || isString(header)},
      footer: Boolean,
      transition: String,
      cancel: Function,
      confirm: Function,
      confirmText: String,
      cancelText: String
    },
    methods: {
      closeModal() {
        this.cancel && this.cancel.apply(this, arguments)
      },
      confirmModal() {
        this.confirm && this.confirm.apply(this, arguments)
      }
    }
  }

</script>
<style src='./modal-base.styl' lang="styl" module/>

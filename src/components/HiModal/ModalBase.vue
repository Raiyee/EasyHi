<template>
  <transition :name="transition">
    <div :class="$style.modalBase">
      <div class="modal-base-dialog">
        <div class="modal-base-content">
          <div class="modal-base-header" v-if="$slots.header">
            <slot name="header"/>
          </div>
          <div class="modal-base-header" v-else-if="label">
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">关闭</span>
            </button>
            <h4 class="modal-base-title" v-html="label"/>
          </div>
          <!--body-->
          <div class="modal-base-body">
            <slot/>
          </div>
          <!--footer-->
          <div class="modal-base-footer" v-if="$slots.footer">
            <slot name="footer"/>
          </div>
          <div class="modal-base-footer" v-else-if="footer">
            <div class="btn-footer btn-cancel" @click="closeModal">{{ cancelText || '取消' }}</div>
            <div class="theme-color btn-footer" @click="confirmModal">{{ confirmText || '确定' }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {isBoolean, isEmptyStr, isString} from 'utils'

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
    computed: {
      label() {
        const header = this.header
        return (isEmptyStr(header) || header === true) ? '&nbsp;' : header
      }
    },
    methods: {
      closeModal() {
        this.close && this.close.apply(this, arguments)
      },
      confirmModal() {
        this.confirm && this.confirm.apply(this, arguments)
      }
    }
  }
</script>
<style src='./modal-base.styl' lang="styl" module/>

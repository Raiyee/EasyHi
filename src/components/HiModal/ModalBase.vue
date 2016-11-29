<template>
  <transition :name="transition === true ? 'bounce' : transition">
    <div :class="$style.modal" :id="id">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" v-if="$slots.header">
            <slot name="header"/>
          </div>
          <div class="modal-header" v-else-if="label">
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">关闭</span>
            </button>
            <h4 class="modal-title" v-html="label"/>
          </div>
          <!--body-->
          <slot name="body" v-if="$slots.body"/>
          <div class="modal-body" v-else>
            <slot/>
          </div>
          <!--footer-->
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"/>
          </div>
          <div class="modal-footer" v-else-if="footer">
            <div class="btn-footer btn-cancel" @click="closeModal">{{ cancelText || '取消' }}</div>
            <div class="theme-color btn-footer" @click="confirmModal">{{ confirmText || '确定' }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {isEmptyStr, warn, error} from 'utils'

  export default {
    props: {
      id: [Number, String],
      header: [Boolean, String],
      footer: Boolean,
      transition: [Boolean, String],
      close: Function,
      confirm: Function,
      confirmText: String,
      cancelText: String
    },
    computed: {
      label() {
        const header = this.header
        return isEmptyStr(header) ? '&nbsp;' : header
      }
    },
    methods: {
      closeModal() {
        this.close ? this.close.apply(this, arguments)
          : this.$modal.close(this.id || warn('there is no modal id found, then the current modal will be close!'))
      },
      confirmModal() {
        this.confirm ? this.confirm.apply(this, arguments)
          : error('you should handle the click event on the confirm btn by yourself!')
      }
    }
  }
</script>
<style src="./modal-base.styl" module/>

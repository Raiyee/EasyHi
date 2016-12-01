<template>
  <transition :name="transition === true ? 'bounce' : transition || undefined">
    <div :class="$style.modal" :id="id">
      <div class="modal-dialog">
        <div class="modal-content">
          <div v-if="$slots.header" class="modal-header">
            <slot name="header"/>
          </div>
          <div v-else-if="label" class="modal-header">
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">关闭</span>
            </button>
            <h4 class="modal-title" v-html="label"/>
          </div>
          <!--body-->
          <slot v-if="$slots.body" name="body"/>
          <div class="modal-body" v-else>
            <slot/>
          </div>
          <!--footer-->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"/>
          </div>
          <div v-else-if="footer" class="modal-footer">
            <div class="btn btn-theme-default" @click="closeModal">{{ cancelText || '取消' }}</div>
            <div class="btn btn-theme-primary" @click="confirmModal">{{ confirmText || '确定' }}</div>
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
<style src="./modal-item.styl" module/>

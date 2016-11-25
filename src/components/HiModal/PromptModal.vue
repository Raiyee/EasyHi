<template>
  <transition :name="transition">
    <div :class="[classes.confirm]">
      <div class="confirm-dialog">
        <div class="confirm-content">
          <div class="confirm-header" v-if="$slots.header">
            <slot name="header"/>
          </div>
          <!--body-->
          <div class="confirm-body">
            <slot/>
          </div>
          <!--footer-->
          <div class="confirm-footer" v-if="$slots.footer">
            <slot name="footer"/>
          </div>
          <div class="confirm-footer" v-else-if="!isToast">
            <div v-if="isTip">
              <div class="theme-color btn-footer btn-footer-confirm" @click="confirmModal">
                {{ confirmText }}
              </div>
            </div>
            <div v-else>
              <div class="btn-footer btn-cancel" @click="closeModal">{{ cancelText }}</div>
              <div class="theme-color btn-footer" @click="confirmModal">{{ confirmText }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import {isBoolean, isString, warn} from 'utils'
  import classes from './promptModal.styl'

  export default {
    props: {
      header: {validator: header => isBoolean(header) || isString(header)},
      footer: Boolean,
      transition: String,
      _close: Function,
      _confirm: Function,
      remove: Function,
      isToast: Boolean,
      timeout: Number,
      isTip: Boolean,
      confirmText: String,
      cancelText: String,
      promptClass: Object
    },
    data() {
      return {
        classes
      }
    },
    mounted() {
      this.isToast && setTimeout(function () {
        this.$modal.close()
        this.remove && this.remove()
      }.bind(this), this.timeout)
    },
    methods: {
      closeModal() {
        this._close ? this._close.apply(this, arguments)
          : this.$modal.close(this.id || warn('there is no modal id found, then the current modal will be close!'))
      },
      confirmModal() {
        this._confirm && this._confirm.apply(this, arguments)
      }
    }
  }
</script>

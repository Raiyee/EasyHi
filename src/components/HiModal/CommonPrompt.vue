<template>
  <transition :name="trasition">
    <div :class="$style.confirm">
      <div :class="$style.confirmDialog">
        <div :class="$style.confirmContent">
          <!--header-->
          <!--<div :class="$style.confirmHeader">-->
            <!--{{ header}}-->
          <!--</div>-->
          <!--body-->
          <div :class="$style.confirmBody" v-html="tipText">
          </div>
          <!--footer-->
          <div :class="$style.confirmFooter" v-if="!isToast">
            <div v-if="isTip">
              <div class="theme-color" :class="[$style.btnFooter, $style.btnFooterConfirm]" @click="_confirm">{{ confirmText }}</div>
            </div>
            <div v-else>
              <div :class="[$style.btnFooter, $style.btnCancel]" @click="_close">{{ cancelText }}</div>
              <div class="theme-color" :class="$style.btnFooter" @click="_confirm">{{ confirmText }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      header: String,
      tipText: String,
      confirm: Function,
      cancel: Function,
      confirmText: String,
      cancelText: String,
      isTip: Boolean,
      isToast: Boolean,
      timeout: Number,
      remove: Function
    },
    mounted() {
      this.isToast && setTimeout(function () {
        this.$modal.close()
        this.remove && this.remove()
      }.bind(this), this.timeout)
    },
    methods: {
      _close() {
        this.cancel && this.cancel()
        this.$modal.close()
      },
      _confirm() {
        this.confirm && this.confirm()
        this.$modal.close()
      }
    }
  }
</script>

<style src="./commonPrompt.styl" lang="styl" module/>

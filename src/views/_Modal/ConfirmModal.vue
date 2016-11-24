<template>
  <transition name="bounce">
    <div :class="$style.confirm" :id="id">
      <div :class="$style.confirmDialog">
        <div :class="$style.confirmContent">
          <!--header-->
          <!--<div :class="$style.confirmHeader">-->
            <!--{{ modalHeader}}-->
          <!--</div>-->
          <!--body-->
          <div :class="$style.confirmBody" v-html="tipText">
          </div>
          <!--footer-->
          <div :class="$style.confirmFooter" v-if="!isToastModal">
            <div v-if="isTipModal">
              <div :class="$style.btnFooter" @click="confirmModal">{{ confirmBtn }}</div>
            </div>
            <div v-else>
              <div :class="[$style.btnFooter, $style.btnCancel]" @click="closeModal">{{ cancelBtn }}</div>
              <div class="btn-theme-default" :class="$style.btnFooter" @click="confirmModal">{{ confirmBtn }}</div>
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
      modalHeader: String,
      tipText: String,
      afterConfirm: Function,
      afterCancel: Function,
      confirmBtn: String,
      cancelBtn: String,
      isTipModal: Boolean,
      isToastModal: Boolean,
      timeoutMill: Number,
      remove: Function
    },
    mounted() {
      this.isToastModal && setTimeout(function() {
        this.remove && this.remove()
        this.$modal.close()
      }.bind(this), this.timeoutMill)
    },
    methods: {
      closeModal() {
        this.close ? this.close.apply(this, arguments)
          : this.$modal.close(this.id || warn('there is no modal id found, then the current modal will be close!'))
      },
      confirmModal() {
        this.confirm && this.confirm.apply(this, arguments)
      },
      close() {
        this.afterCancel && this.afterCancel()
        this.$modal.close()
      },
      confirm() {
        this.afterConfirm && this.afterConfirm()
        this.$modal.close()
      }
    }
  }
</script>
<style src="./confirmModal.styl" lang="styl" module/>

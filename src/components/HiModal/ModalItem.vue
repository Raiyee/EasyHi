<template>
  <div class="modal" :class="{fade, in: show}" :style="{display: show ? 'block' : 'none'}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" v-if="$slots.header">
          <slot name="header"/>
        </div>
        <div class="modal-body" v-if="$slots.body">
          <slot name="body"/>
        </div>
        <slot/>
        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {addClass} from 'utils'

  export default {
    props: {
      fade: {
        type: Boolean,
        default: true
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

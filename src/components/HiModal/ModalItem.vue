<template>
  <div class="modal" :id="id">
    <div class="modal-dialog">
      <div class="modal-content">
        <!--header-->
        <div class="modal-header" v-if="$slots.header">
          <slot name="header"/>
        </div>
        <div class="modal-header" v-else v-if="label">
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">关闭</span>
          </button>
          <h4 class="modal-title" v-html="label"></h4>
        </div>
        <!--body-->
        <div class="modal-body">
          <slot/>
        </div>
        <!--footer-->
        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer"/>
        </div>
        <div class="modal-footer" v-else v-if="footer">
          <button type="button" class="btn btn-default" @click="closeModal">取消</button>
          <button type="button" class="btn btn-primary" @click="confirmModal">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {isBoolean, isEmptyStr, isNumber, isString, warn} from 'utils'

  export default {
    props: {
      id: {validator: id => isNumber(id) || isString(id)},
      header: {validator: header => isBoolean(header) || isString(header)},
      footer: {type: Boolean},
      close: {type: Function},
      confirm: {type: Function}
    },
    computed: {
      label() {
        const header = this.header
        return isEmptyStr(header) ? '&nbsp;' : header
      }
    },
    methods: {
      closeModal() {
        if (this.close) return this.close.apply(this, arguments)

        if (!this.id) return warn(`there is no modal id found, please make sure to pass 'id' prop to close the modal`)

        this.$modal.close(this.id)
      },
      confirmModal() {
        this.confirm && this.confirm.apply(this, arguments)
      }
    }
  }
</script>

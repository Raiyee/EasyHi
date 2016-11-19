<template>
  <div>
    <button class="btn btn-theme-primary" @click="toggleShow">点击{{ show ? '隐藏' : '显示' }}模态框</button>
    <ModalItem :show="show">
      <template slot="header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
          class="sr-only">Close</span></button>
        <h4 class="modal-title">Modal title</h4>
      </template>
      <template slot="body">
        <p>One fine body&hellip;</p>
        xxxx
      </template>
      <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">Close</button>
        <button type="button" class="btn btn-primary" @click="confirm">Save changes</button>
      </template>
    </ModalItem>
  </div>
</template>
<script>
  import ModalItem from 'components/HiModal/ModalItem'

  export default {
    data() {
      return {
        show: false
      }
    },
    components: {
      ModalItem
    },
    methods: {
      toggleShow() {
        this.show = !this.show
      },
      close() {
        this.show = false
      },
      confirm() {
        setTimeout(() => this.close(), 500)
      }
    }
  }
</script>

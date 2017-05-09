<template lang="pug">
  modal-item(:class="$style.container", transition="bottom")
    template(v-if="!editingImg")
      .bottom
        ul.list-unstyled
          li(@click="toggleImage(1)")
            span.iconfont.icon-img2
            | 换轮播图1
          li(@click="toggleImage(2)")
            span.iconfont.icon-img1
            | 换轮播图2
          li(@click="changeColor")
            span.iconfont(:class="[editingColor ? 'icon-black' : 'icon-white']")
            | 文字颜色
          li(@click="changeMask")
            span.iconfont.icon-unchecked
            | 蒙层
      .border-t(:class="$style.action")
        div(@click="closeModal") 取消
        div.theme-color.border-l(@click="confirmModal") 保存

    template(v-else)
      ul.list-unstyled
        li(@click="selectDefaultImg")
          div(:class="[$style.defaultImg, editingImgIndex - 1 ? $style.pic2 : $style.pic1]")
          | 默认图{{editingImgIndex}}
        li(@click="selectImg")
          span.iconfont.icon-img-reverse
          | 选择图片
        input.hidden(type="file", @change="previewFile", accept="image/*", ref="img")

      div(:class="$style.footer")
        span.iconfont.icon-error(@click="revertImg")
        span 换轮播图{{ editingImgIndex }}
        span.iconfont.icon-correct.theme-color(@click="confirmImg")
</template>
<script>
  import ModalItem from 'components/HiModal/ModalItem'

  import {resizeImgFile} from 'utils'

  export default {
    props: {
      editingColor: Boolean,
      editingMask: Boolean,
      editingInitImg: String,
      confirm: Function,
      close: Function
    },
    data() {
      return {
        editingImg: false,
        editingImgIndex: 1,
        result: ''
      }
    },
    methods: {
      toggleImage(index) {
        this.editingImg = true
        this.editingImgIndex = index
      },
      previewFile(e) {
        const input = e.target
        resizeImgFile(input.files[0], result => {
          this.$emit('toggleImg', this.editingImgIndex, (this.result = result))
          input.value = null
        })
      },
      selectImg() {
        this.$refs.img.click()
      },
      changeColor() {
        this.$emit('toggleColor')
      },
      changeMask() {
        this.$emit('toggleMask')
      },
      selectDefaultImg() {
        this.result = ''
        this.$emit('reInitImg', this.editingImgIndex)
      },
      revertImg() {
        this.editingImg = false
        this.result = ''
        this.$emit('reInitImg', this.editingImgIndex)
      },
      confirmImg() {
        this.$emit('toggleImg', this.editingImgIndex, this.result)
        this.editingImg = false
        this.result = ''
      },
      closeModal() {
        this.close()
      },
      confirmModal() {
        this.confirm()
      }
    },
    components: {
      ModalItem
    }
  }
</script>
<style lang="stylus" module>
  .container
    :global
      .modal-dialog .modal-content
        fixed(bottom, left)
        width 100%
        border none
        border-radius 0
        box-shadow 0

        .modal-body
          padding 0

    ul
      display flex
      margin-bottom 0
      padding 20px
      color grey

      li
        flex 1
        text-align center

        span
          display block
          font-size 30px

        :global(.iconfont)
          display block
          font-size 30px
          transform scale(1)

  .action
    display flex

    > div
      flex 1
      text-align center
      padding 10px

  .footer
    display flex
    border-top 1px solid $list-line-color

    > span
      display table-cell
      padding 10px 30px

      &:nth-child(2)
        width 10000px
        text-align center

    > :global(.iconfont)
      font-size 16px

  .default-img
    width 30px
    height 30px
    margin 5px auto 7px auto
    border 2px solid
    border-radius 50%

  .pic1
    retina('./home-01')

  .pic2
    retina('./home-02')
</style>

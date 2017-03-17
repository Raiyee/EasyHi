import {resizeImgFile} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  props: {
    imgs: {
      type: Array,
      default: () => ([])
    },
    upload: Boolean,
    padding: Boolean
  },
  data: () => ({classes}),
  methods: {
    chooseImg() {
      this.$refs.file.click()
    },
    fileChanged(e) {
      resizeImgFile(e.target.files[0], result => this.imgs.push(result))
    },
    removeImg(index) {
      this.imgs.splice(index, 1)
    },
    previewImg(index) {
      this.$modal.open({
        id: 'preview-image',
        component: import('components/HiModal/PreviewImage'),
        options: {
          show: true
        },
        props: {
          imgs: this.imgs,
          index
        }
      })
    }
  }
})

import {mapGetters} from 'vuex'

import ModalItem from './ModalItem'

import {REQUIRED_ARRAY, intervalVal} from 'utils'

import classes from './preview-image.styl'

export default require('./preview-image.pug')({
  props: {
    imgs: {
      ...REQUIRED_ARRAY,
      validate: imgs => imgs.length
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      classes,
      currIndex: this.index,
      scale: false,
      translateX: 0,
      translateStart: 0,
      opening: false
    }
  },
  created() {
    this.resetTranslateX()
  },
  computed: {
    ...mapGetters(['appWidth', 'winHeight']),
    transform() {
      return `translate3d(${this.translateX}px, 0, 0)`
    }
  },
  watch: {
    index(index) {
      this.currIndex = index
      this.resetTranslateX()
    }
  },
  methods: {
    afterEnter() {
      this.opening = true
    },
    closeModal() {
      if (!this.opening || this.scale) return
      this.$modal.close()
      this.opening = false
    },
    resetTranslateX() {
      this.translateX = -this.currIndex * this.appWidth
    },
    moveStart() {
      this.translateStart = this.translateX
    },
    moving(e) {
      this.scale = false
      this.translateX = this.translateStart + e.changedX
    },
    moveEnd(e) {
      const {changedX} = e
      const {currIndex} = this
      if (Math.abs(changedX) > 50) {
        this.currIndex = intervalVal(0, this.imgs.length - 1, changedX > 50 ? currIndex - 1 : currIndex + 1)
      }
      this.resetTranslateX()
    }
  },
  components: {
    ModalItem
  }
})

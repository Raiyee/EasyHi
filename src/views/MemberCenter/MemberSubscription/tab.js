import {mapGetters} from 'vuex'

import {toNum} from 'utils'
import classes from './tab.styl'

export default require('./tab.pug')({
  name: 'tab',
  props: {
    width: String,
    index: {
      type: Number,
      default: 0
    },
    autoToggle: {
      type: Boolean,
      default: true
    },
    pageNum: {
      type: Number,
      default: 3,
      validator(value) {
        return value > 0
      }
    },
    items: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0
      }
    }
  },
  data() {
    return {
      translateX: 0,
      translateStart: 0,
      currIndex: this.index,
      classes
    }
  },
  computed: {
    ...mapGetters(['winWidth']),
    containerWidth() {
      const width = toNum(this.width)
      return this.width.endsWith('px') ? width : width / 100 * this.winWidth
    },
    itemsWidth() {
      let len = this.items.length
      return this.containerWidth / Math.min(this.pageNum, len) * len
    },
    itemWidth() {
      return this.itemsWidth / this.items.length
    },
    border() {
      return this.translateX + this.itemWidth * this.currIndex
    },
    transform() {
      return `translate3d(${this.translateX}px, 0, 0)`
    },
    transformBorder() {
      return `translate3d(${this.border}px, 0, 0)`
    }
  },
  mounted() {
    this.translateX = -this.itemWidth * this.currIndex
  },
  methods: {
    moveStart() {
      this.translateStart = this.translateX
    },
    moving(e) {
      this.translateX = this.translateStart + e.changedX
    },
    moveEnd(e) {
      let perWidth = this.itemsWidth / this.items.length
      const changedX = e.changedX
      let toChangeX = 0
      if (Math.abs(changedX) > 15) {
        toChangeX = Math[changedX > 0 ? 'ceil' : 'floor'](changedX / perWidth)
      }

      const translateX = this.translateStart + toChangeX * perWidth
      this.translateX = Math.min(Math.max(translateX, this.containerWidth - this.itemsWidth), 0)

      if (this.autoToggle) {
        let currIndex
        // 当currIndex 不在可视区域内触发
        if (this.border < 0) {
          currIndex = -this.translateX / perWidth
        } else if (this.border >= this.pageNum * perWidth) {
          currIndex = this.pageNum - this.translateX / perWidth - 1
        }
        currIndex && this.toggleItem(this.items[currIndex], currIndex)
      }
    },
    toggleItem: function (item, index) {
      if (this.currIndex === index) return
      this.currIndex = index
      this.$emit('toggleTab', item, index)
    }
  }
})

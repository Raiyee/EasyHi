import {mapGetters} from 'vuex'

import TabItem from './TabItem'

import {isObject, isUndefined, toNum, REQUIRED_ARRAY} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'hi-tab',
  props: {
    items: {
      ...REQUIRED_ARRAY,
      validator(value) {
        return value.length > 0
      }
    },
    width: [String, Number],
    defaultIndex: {
      type: Number,
      default: 0
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    textKey: {
      type: String,
      default: 'text'
    },
    auto: {
      type: Boolean,
      default: true
    },
    showNum: {
      type: Number,
      default: 3,
      validator(value) {
        return value > 0
      }
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      classes,
      translateX: 0,
      translateStart: 0,
      currIndex: this.defaultIndex,
      touchEnable: this.items.length > this.showNum
    }
  },
  computed: {
    ...mapGetters(['appWidth', 'dpi']),
    transform() {
      return `translate3d(${this.translateX}px, 0, 0)`
    },
    containerWidth() {
      const tabWidth = (this.width || '100%').toString()
      const widthNum = toNum(tabWidth)
      const containerWidth = tabWidth.endsWith('%') ? widthNum / 100 * this.appWidth : widthNum
      return containerWidth - 20
    },
    itemsWidth() {
      let len = this.items.length
      return this.containerWidth / Math.min(this.showNum, len) * len
    },
    itemWidth() {
      return this.itemsWidth / this.items.length
    },
    borderTranslateX() {
      return this.translateX + this.itemWidth * this.currIndex
    },
    borderTransform() {
      return `translate3d(${this.borderTranslateX}px, 0, 0)${this.dpi > 1 ? 'scaleY(.5)' : ''}`
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

      if (!this.auto) return

      const {showNum, borderTranslateX} = this

      let index
      // 当currIndex 不在可视区域内触发
      if (borderTranslateX < 0) index = 0
      else if (borderTranslateX >= showNum * perWidth) index = showNum - 1

      if (isUndefined(index)) return
      const currIndex = Math.round(index - this.translateX / perWidth)
      const item = this.items[currIndex]
      const object = isObject(item)
      const params = [item]
      object && params.unshift(item[this.valueKey], item[this.textKey])
      this.toggleItem(currIndex, ...params)
    },
    toggleItem: function (index) {
      if (this.currIndex === index) return
      this.currIndex = index
      this.$emit('toggleTab', ...arguments)
    }
  },
  components: {
    TabItem
  }
})

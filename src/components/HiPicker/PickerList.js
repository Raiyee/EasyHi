import {mapGetters} from 'vuex'

import {REQUIRED_ARRAY, REQUIRED_BOOLEAN, REQUIRED_NUMBER, intervalVal, isJsonSame, isObject} from 'utils'

import classes from './picker-list.styl'

export default require('./picker-list.pug')({
  name: 'picker-list',
  props: {
    className: [Array, String, Object],
    defaultIndex: {
      type: Number,
      default: 0
    },
    flex: Number,
    hasTitle: REQUIRED_BOOLEAN,
    index: REQUIRED_NUMBER,
    length: REQUIRED_NUMBER,
    maxWidth: String,
    mask: Boolean,
    title: String,
    textAlign: String,
    valueKey: {
      type: String,
      default: 'value'
    },
    textKey: {
      type: String,
      default: 'text'
    },
    values: REQUIRED_ARRAY,
    visibleCount: REQUIRED_NUMBER
  },
  data() {
    const object = isObject(this.values[0])
    return {
      classes,
      object,
      baseIndex: (this.visibleCount - 1) / 2,
      currIndex: this.defaultIndex,
      translateY: 0
    }
  },
  mounted() {
    this.resetTranslateY()
  },
  computed: {
    ...mapGetters(['rem']),
    align() {
      return this.textAlign || this.length === 2 ? this.index ? 'left' : 'right' : 'center'
    },
    itemHeight() {
      return 36 * this.rem
    },
    height() {
      return this.visibleCount * this.itemHeight + 'px'
    },
    transform() {
      return `translate3d(0, ${this.translateY}px, 0)`
    }
  },
  watch: {
    values(curr, prev) {
      if (isJsonSame(curr, prev)) return
      this.currIndex = 0
      this.resetTranslateY()
      this.emitChange()
    }
  },
  methods: {
    resetTranslateY() {
      this.translateY = (this.baseIndex - this.currIndex) * this.itemHeight
    },
    moveStart() {
      this.translateStart = this.translateY
    },
    moving(e) {
      const changeY = e.changedY
      this.translateY = this.translateStart + changeY
    },
    moveEnd() {
      const visibleCount = this.visibleCount
      const baseIndex = this.baseIndex
      const itemHeight = this.itemHeight
      const translateY = intervalVal(((visibleCount + 1) / 2 - this.values.length) * itemHeight,
        baseIndex * itemHeight, this.translateY)
      const translateIndex = Math.round(translateY / itemHeight)
      this.translateY = translateIndex * itemHeight
      if (this.setCurrIndex(baseIndex - translateIndex)) return
      this.emitChange()
    },
    setCurrIndex(index) {
      if (index === this.currIndex) return true
      this.currIndex = index
    },
    emitChange() {
      const {currIndex: index, object} = this
      const value = this.values[index]
      this.$emit('itemChanged', this.index, object ? value[this.valueKey] : index, object ? value[this.textKey] : value)
    },
    tapItem(index) {
      if (this.setCurrIndex(index)) return
      this.resetTranslateY()
      this.emitChange()
    }
  }
})

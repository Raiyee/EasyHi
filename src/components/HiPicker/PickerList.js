import {mapGetters} from 'vuex'

import {REQUIRED_NUMBER, intervalVal, isJsonSame} from 'utils'

import classes from './picker-list.styl'

export default require('./picker-list.pug')({
  props: {
    changingIndex: Number,
    className: [Array, String, Object],
    defaultIndex: {
      type: Number,
      default: 0
    },
    divider: String,
    flex: Number,
    hasTitle: Boolean,
    index: Number,
    maxWidth: String,
    title: String,
    textAlign: String,
    valueKey: String,
    textKey: String,
    values: Array,
    visibleCount: REQUIRED_NUMBER
  },
  data() {
    return {
      classes,
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
      const value = this.values[this.currIndex]
      this.$emit('itemChanged', this.index, value[this.valueKey], value[this.textKey])
    },
    tapItem(index) {
      if (this.setCurrIndex(index)) return
      this.resetTranslateY()
      this.emitChange()
    }
  }
})

import {mapGetters} from 'vuex'

import {REQUIRED_NUMBER, intervalVal} from 'utils'

import classes from './picker-list.styl'

const ITEM_HEIGHT = 36

export default require('./picker-list.pug')({
  props: {
    className: [Array, String, Object],
    divider: String,
    flex: Number,
    index: Number,
    textAlign: {
      type: String,
      default: 'center'
    },
    valueKey: String,
    valueText: String,
    values: Array,
    visibleCount: REQUIRED_NUMBER
  },
  data() {
    const baseIndex = (this.visibleCount - 1) / 2
    return {
      classes,
      baseIndex,
      currIndex: baseIndex,
      translateY: 0,
      translateStart: 0
    }
  },
  computed: {
    ...mapGetters(['rem']),
    height() {
      return this.divider || this.visibleCount * ITEM_HEIGHT * this.rem + 'px'
    },
    transform() {
      return `translate3d(0, ${this.translateY}px, 0)`
    }
  },
  methods: {
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

      const translateY = intervalVal(((visibleCount + 1) / 2 - this.values.length) * ITEM_HEIGHT,
        baseIndex * ITEM_HEIGHT, this.translateY)

      const translateIndex = Math.round(translateY / ITEM_HEIGHT)

      const prevIndex = this.currIndex
      const currIndex = this.currIndex = baseIndex - translateIndex

      this.translateY = translateIndex * ITEM_HEIGHT

      if (prevIndex === currIndex) return

      this.emit()
    },
    emit() {
      const value = this.values[this.currIndex]
      this.$emit('itemChanged', this.index, value[this.valueKey], value[this.valueText])
    },
    tapItem(index) {
      const prevIndex = this.currIndex

      if (prevIndex === index) return

      this.currIndex = index
      this.translateY = (this.baseIndex - index) * ITEM_HEIGHT

      this.emit()
    }
  }
})

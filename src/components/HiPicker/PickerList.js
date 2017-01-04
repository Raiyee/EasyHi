import {mapGetters} from 'vuex'

import {REQUIRED_NUMBER, intervalVal} from 'utils'

import classes from './picker-list.styl'

export default require('./picker-list.pug')({
  props: {
    className: [Array, String, Object],
    defaultIndex: {
      type: Number,
      default: 0
    },
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
    return {
      classes,
      baseIndex: (this.visibleCount - 1) / 2,
      currIndex: this.defaultIndex,
      translateY: 0
    }
  },
  mounted(){
    this.translateY = (this.baseIndex - this.currIndex) * this.itemHeight
  },
  computed: {
    ...mapGetters(['rem']),
    itemHeight() {
      return 36 * this.rem
    },
    height() {
      return this.divider || this.visibleCount * this.itemHeight + 'px'
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

      const itemHeight = this.itemHeight

      const translateY = intervalVal(((visibleCount + 1) / 2 - this.values.length) * itemHeight,
        baseIndex * itemHeight, this.translateY)

      const translateIndex = Math.round(translateY / itemHeight)

      const prevIndex = this.currIndex
      const currIndex = this.currIndex = baseIndex - translateIndex

      this.translateY = translateIndex * itemHeight

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
      this.translateY = (this.baseIndex - index) * this.itemHeight

      this.emit()
    }
  }
})

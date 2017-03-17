import {mapGetters} from 'vuex'

import Voucher from './Voucher'

import {REQUIRED_ARRAY, intervalVal} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  props: {
    vouchers: {
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
    showNum: {
      type: Number,
      default: 1,
      validator(value) {
        return value > 0
      }
    }
  },
  data() {
    return {
      classes,
      translateX: 0,
      translateStart: 0,
      currIndex: this.defaultIndex,
      touchEnable: this.vouchers.length > this.showNum
    }
  },
  computed: {
    ...mapGetters(['appWidth', 'dpi', 'rem', 'mode']),
    transform() {
      return `translate3d(${this.translateX}px, 0, 0)`
    },
    vouchersWidth() {
      return this.voucherWidth * this.vouchers.length
    },
    voucherWidth() {
      return 330 * this.rem
    }
  },
  watch: {
    defaultIndex(defaultIndex) {
      this.currIndex = defaultIndex
      this.resetTranslateX()
    }
  },
  mounted() {
    this.resetTranslateX()
  },
  methods: {
    resetTranslateX() {
      if (this.vouchers.length <= 1) return
      this.translateX = -this.voucherWidth * Math.min(this.defaultIndex, this.vouchers.length - this.showNum)
    },
    moveStart() {
      this.translateStart = this.translateX
    },
    moving(e) {
      this.translateX = this.translateStart + e.changedX
    },
    moveEnd(e) {
      const changedX = e.changedX

      let {currIndex, voucherWidth} = this

      const threshold = voucherWidth / 4

      if (changedX > threshold) {
        currIndex--
      } else if (changedX < -threshold) {
        currIndex++
      }

      this.currIndex = intervalVal(0, this.vouchers.length - 1, currIndex)
      this.translateX = -this.currIndex * voucherWidth
      this.toggleVoucher()
    },
    toggleVoucher() {
      this.$emit('toggleVoucher', this.currIndex)
    }
  },
  components: {
    Voucher
  }
})

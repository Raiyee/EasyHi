import {mapGetters} from 'vuex'

import {VOUCHER} from 'flow/voucher'

import {isAfterToday, combineDuration, isBeforeToday} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  props: {
    voucher: {
      type: Object,
      require: true,
      validator: (voucher: VOUCHER) => true
    },
    benchmark: Number,
    selectable: Boolean,
    selected: Boolean,
    extraBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      classes
    }
  },
  computed: {
    ...mapGetters(['memberUrlPrefix', 'isConsumer']),
    available() {
      const {voucher: {miniConsume, usedTime, voucherExpiredRange}, benchmark} = this

      if (benchmark) return miniConsume <= benchmark && !usedTime && !isBeforeToday(voucherExpiredRange[1])
      return !usedTime && !isBeforeToday(voucherExpiredRange[1])
    },
    showExtraBtn() {
      const {voucher: {voucherExpiredRange, usedTime}} = this
      return this.extraBtn && !isAfterToday(voucherExpiredRange[0]) && !usedTime &&
        isAfterToday(voucherExpiredRange[1])
    },
    voucherExpiredRange() {
      return combineDuration(this.voucher.voucherExpiredRange)
    },
    cashVoucherState() {
      return this.voucher.usedTime ? 'Used'
        : isBeforeToday(this.voucher.voucherExpiredRange[1]) ? 'Expired' : 'Invisible'
    },
    voucherExpired() {
      const {voucherInstId, voucherExpiredType, voucherExpiredRange, voucherExpiredLimit} = this.voucher
      return voucherInstId || voucherExpiredType ? '有效期: ' + combineDuration(voucherExpiredRange)
        : '领券后' + voucherExpiredLimit + '天内有效'
    }
  },
  methods: {
    goSubscribeSchedule() {
      location.href = this.memberUrlPrefix + 'member-subscribe/subscribe-course'
    }
  }
})

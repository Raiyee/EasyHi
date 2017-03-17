import HiVoucher from 'components/HiVoucher'

import {isBeforeToday} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'voucher-inst-detail',
  data() {
    const voucher = this.$route.meta.data
    return {
      classes,
      voucher: {
        ...voucher,
        voucherInstId: this.$route.params.voucherInstId
      },
      sourceActivityRange: null,
      usedTime: null,
      ...voucher
    }
  },
  computed: {
    useCondition() {
      const {applicableCourses = []} = this
      const len = applicableCourses.length
      return this.miniConsume ? '购买本馆会员卡'
        : '体验本馆' + (len ? '' : '所有') + '课程' + (len ? ', 适用课程有: ' + applicableCourses.join('、') : '')
    },
    voucherExpired() {
      return !this.usedTime && isBeforeToday(this.voucherExpiredRange[1])
    }
  },
  components: {
    HiVoucher
  }
})

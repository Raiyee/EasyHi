import {alert, picker, datePicker, formatDate, isBeforeToday, DATE_FORMAT2, PICKER_ID} from 'utils'

import classes from './voucher-selection.styl'

export default require('./voucher-selection.pug')({
  name: 'voucher-selection',
  props: {
    selects: Array,
    voucher: Object
  },
  data() {
    return {
      classes,
      picking: this.voucher.voucherExpiredType
    }
  },
  computed: {
    selected() {
      return this.selects.find(select => select === this.voucher.voucherId)
    },
    voucherExpiredRange() {
      return this.voucher.voucherExpiredRange.map(date => formatDate(date, DATE_FORMAT2)).join('至')
    },
    voucherExpiredLimit: {
      get() {
        return this.voucher.voucherExpiredLimit
      },
      set(val) {
        this.voucher.voucherExpiredLimit = val
      }
    }
  },
  methods: {
    toggleVoucher() {
      this.$emit('toggleVoucher', this.voucher.voucherId)
    },
    changeExpired() {
      picker({
        pickers: [{
          defaultIndex: +this.voucher.voucherExpiredType,
          values: ['从领券成功开始计算', '指定有效期']
        }],
        close: () => {
          this.picking = false
          this.$modal.close(PICKER_ID)
        },
        confirm: voucherExpiredType => {
          this.$modal.close(PICKER_ID)
          const rangePicked = this.voucher.voucherExpiredRange.length === 2;
          (this.picking = voucherExpiredType && !rangePicked) || this.expiredChanged(voucherExpiredType)
        }
      }, {
        destroyed: this.chooseExpiredDates
      })
    },
    chooseExpiredDates() {
      if (!this.picking) return
      datePicker({
        pickerTabs: true,
        confirm: (startDate, endDate) => {
          if (isBeforeToday(startDate) || startDate > endDate) return alert('请选择正确的起止日期')
          this.$modal.close(PICKER_ID)
          this.voucher.voucherExpiredRange = [startDate, endDate]
          this.expiredChanged(true)
        }
      }, this.voucher.voucherExpiredRange[0])
    },
    expiredChanged(voucherExpiredType) {
      this.voucher.voucherExpiredType = voucherExpiredType
    }
  },
  validator: {
    voucherExpiredLimit: {
      integer: 3
    }
  }
})

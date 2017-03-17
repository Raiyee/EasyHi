import qs from 'qs'

import HiDropdown from 'components/HiDropdown'

import {commonMonths, groupWithDate, isBeforeToday} from 'utils'

import classes from './index.styl'

const MONTH_INDEXES = [0, -1, -2, -3, -4]

export default require('./index.pug')({
  name: 'presented-vouchers',
  data() {
    const vouchers = this.$route.meta.data
    const allVouchers = {0: vouchers}
    return {
      classes,
      selections: [{
        valueKey: 'monthIndex',
        textKey: 'monthText',
        selections: commonMonths()
      }, {
        selections: ['全部优惠券', '体验券', '现金券']
      }, {
        selections: ['已赠送', '已使用', '未使用', '已过期']
      }],
      selected: [{
        value: 0,
        text: '本月'
      }, {
        value: 0,
        text: '全部优惠券'
      }, {
        value: 0,
        text: '已赠送'
      }],
      monthIndex: 0,
      typeIndex: 0,
      filterIndex: 0,
      vouchers,
      allVouchers
    }
  },
  watch: {
    async monthIndex(val) {
      const {allVouchers, monthIndex} = this

      if (monthIndex === null && !allVouchers[null]) {
        const unfetchedIndexes = this.getUnfetchedIndexes()
        unfetchedIndexes.length && Object.assign(allVouchers,
          (await this.$http.post('/cash-coupon/coupon-list-by-date-array', unfetchedIndexes)).data)
        allVouchers[null] = MONTH_INDEXES.reduce((prev, curr) => (prev.concat(allVouchers[curr])), [])
      }

      this.vouchers = allVouchers[monthIndex] || (allVouchers[monthIndex] =
          (await this.$http.post('/cash-coupon/coupon-list-by-date', qs.stringify({monthIndex: val}))).data)
    }
  },
  computed: {
    filteredVouchers() {
      const {typeIndex} = this
      const vouchers = this.vouchers.filter(({miniConsume}) => !typeIndex || typeIndex - 1 === +!!miniConsume)
      return [
        vouchers,
        vouchers.filter(({usedTime}) => usedTime),
        vouchers.filter(({usedTime}) => !usedTime),
        vouchers.filter(({voucherExpiredRange: [startTime, endTime] = []}) => isBeforeToday(endTime))
      ]
    },
    groupedVouchers() {
      return groupWithDate(this.filteredVouchers[this.filterIndex], 'receivedTime')
    }
  },
  methods: {
    getUnfetchedIndexes() {
      return MONTH_INDEXES.filter(val => !this.allVouchers[val])
    },
    toggleActive([monthIndex, typeIndex, filterIndex]) {
      this.monthIndex = monthIndex
      this.typeIndex = typeIndex
      this.filterIndex = filterIndex
    }
  },
  components: {
    HiDropdown
  }
})

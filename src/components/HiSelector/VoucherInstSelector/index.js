import {mapGetters} from 'vuex'

import ModalItem from 'components/HiModal/ModalItem'
import HiVoucher from 'components/HiVoucher'

import {illustrate, REQUIRED_FUNCTION, REQUIRED_NUMBER} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'voucher-inst-selector',
  props: {
    cardPrice: REQUIRED_NUMBER,
    benchmark: REQUIRED_NUMBER,
    vouchers: {
      type: Array,
      default: () => []
    },
    voucherInstId: String,
    confirm: REQUIRED_FUNCTION
  },
  data() {
    return {
      classes,
      voucherList: this.vouchers,
      selected: this.voucherInstId,
      confirming: false,
      initialized: !!this.vouchers.length
    }
  },
  async created() {
    if (this.initialized) return
    this.voucherList = (await this.$http.post('/cash-coupon/query-can-use-coupons')).data || []
    this.initialized = true
  },
  computed: {
    ...mapGetters(['winHeight', 'rem', 'merchantName']),
    height() {
      return this.winHeight - 62 * this.rem + 'px'
    },
    availableVouchers() {
      const {selected, benchmark, cardPrice, voucherList} = this
      const availableVouchers = voucherList.filter(({miniConsume}) => (benchmark || cardPrice) >= miniConsume)

      if (this.initialized && selected && !availableVouchers.find(({voucherInstId}) => voucherInstId === selected)) {
        const [first] = availableVouchers
        this.selected = first && first.voucherInstId
      }

      return availableVouchers
    },
    unavailableVouchers() {
      const {benchmark, cardPrice} = this
      return this.voucherList.filter(({miniConsume}) => (benchmark || cardPrice) < miniConsume)
    }
  },
  methods: {
    afterLeave() {
      this.confirming || (this.selected = this.voucherInstId)
    },
    toggleSelect(voucherInstId) {
      this.selected = voucherInstId
    },
    showIntro() {
      illustrate({
        tipText: ['1、现金券只适用于系统内购买本场馆会员卡时使用；',
          '2、购买会员卡时每次限用1张；',
          '3、若订单取消未支付，现金券将退还到您的账户；',
          `4、现金券不兑换，不找零，不得赠送，使用时最终解释权归${this.merchantName}所有。`].join('<br>'),
        class: 'remark-color'
      })
    },
    closeSelector() {
      this.$modal.close()
      this.confirming = false
    },
    confirmSelector() {
      this.confirming = true
      this.confirm(this.voucherList.find(({voucherInstId}) => voucherInstId === this.selected))
    }
  },
  components: {
    ModalItem,
    HiVoucher
  }
})

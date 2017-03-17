import {mapGetters} from 'vuex'

import ModalItem from 'components/HiModal/ModalItem'

import VoucherSelection from './VoucherSelection'

import {alert, remove, REQUIRED_FUNCTION} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'voucher-selector',
  props: {
    single: Boolean,
    vouchers: Array,
    confirm: REQUIRED_FUNCTION
  },
  data() {
    return {
      classes,
      selects: [],
      voucherList: this.vouchers || []
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'rem', 'winHeight']),
    height() {
      return this.winHeight - 64 * this.rem + 'px'
    }
  },
  async created() {
    if (this.voucherList.length) return
    this.voucherList = (await this.$http.get('/voucher/vouchers-list')).data || []
  },
  methods: {
    addVoucher() {
      // 由于目前券是与活动发布挂钩的，无法使用老页面，暂时隐藏添加券的功能
    },
    toggleVoucher(voucherId) {
      if (remove(this.selects, voucherId)) return
      this.single ? (this.selects = [voucherId]) : this.selects.push(voucherId)
    },
    confirmSelector() {
      const vouchers = this.voucherList.filter(voucher => this.selects.includes(voucher.voucherId))

      if (vouchers.find(({voucherExpiredType, voucherExpiredLimit}) =>
        !voucherExpiredType && !(voucherExpiredLimit >= 1 && voucherExpiredLimit <= 100))) {
        return alert('券有效期天数为1-100以内的整数')
      }

      if (!vouchers.length) return

      this.confirm(this.single ? vouchers[0] : vouchers)
    }
  },
  components: {
    ModalItem,
    VoucherSelection
  }
})

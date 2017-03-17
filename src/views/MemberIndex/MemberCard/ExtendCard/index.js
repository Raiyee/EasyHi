import MbrCard from 'components/HiCard/MbrCard'
import HiPay from 'mixins/HiPay'

import {alert, login} from 'utils'

import {mapGetters, mapActions} from 'vuex'

import classes from './index.styl'

const VOUCHER_INST_SELECTOR = 'voucher-inst-selector'

export default require('./index.pug')({
  mixins: [HiPay],
  name: 'extend-card',
  data() {
    const {auth, data} = this.$route.meta
    return {
      classes,
      auth: !!auth,
      cardPrice: '',
      error: false,
      ...data
    }
  },
  computed: {
    ...mapGetters(['authorized', 'isStaff']),
    bill() {
      const price = this.cardPrice ? this.cardPrice : 0
      this.validatorPrice()
      return +Math.max(0, price -
        (!this.isStaff && this.cashVoucher ? this.cashVoucher.voucherValue : 0)).toFixed(2)
    }
  },
  created() {
    this.cardPrice = this.mbrCard.cardPrice
  },
  methods: {
    ...mapActions(['resetRole']),
    reSetPrice() {
      this.error = false
    },
    validatorPrice() {
      if (this.cardPrice < this.mbrCard.cardPrice) {
        this.error = true
        this.cashVoucher = null
      } else {
        this.error = false
      }
    },
    async getCashVoucher() {
      this.validatorPrice()

      if (!this.error) {
        this.cashVoucher =
          (await this.$http.post(`/renew-mbrcard/optimal-coupon/${this.cardPrice}`)).data
      }
    },
    selectVoucher() {
      if (this.error) return
      const {cashVoucher, cardPrice, mbrCard} = this

      this.$modal.open({
        id: VOUCHER_INST_SELECTOR,
        component: import('components/HiSelector/VoucherInstSelector'),
        options: {
          show: true
        },
        props: {
          benchmark: cardPrice,
          cardPrice: mbrCard.cardPrice,
          voucherInstId: cashVoucher && cashVoucher.voucherInstId,
          confirm: voucher => {
            this.cashVoucher = voucher
            this.$modal.close(VOUCHER_INST_SELECTOR)
          }
        }
      })
    },
    afterPay(orderId) {
      this.$router.push(`/card-sales/pay-result/${orderId}`)
    },
    startPay() {
      this.authorized ? this.confirmPay() : login({
        confirmText: '立即下单',
        confirm: () => {
          this.$modal.close()
          this.confirmPay()
        }
      })
    },
    confirmPay() {
      if (this.isStaff) return alert('员工不可以购买会员卡哦！')

      this.createOrder()
    },
    async createOrder() {
      const {cardPrice, mbrCard, cashVoucher} = this
      const {data: {code, msg, data}} = await this.$http.post('/renew-mbrcard/create-order',
        {
          mbrcardId: mbrCard.mbrCardId,
          realPrice: cardPrice,
          mbrCouponId: cashVoucher && cashVoucher.voucherInstId
        })

      if (code === '1000') {
        this.resetRole()
        return this.startPay()
      }

      if (code !== 'ok') return alert(msg)

      const {orderId, orderState} = data

      if (orderState === '2') return this.afterPay(orderId)

      this.pay(orderId, true)
    }
  },
  components: {
    MbrCard
  }
})

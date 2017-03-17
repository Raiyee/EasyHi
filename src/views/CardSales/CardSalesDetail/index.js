import qs from 'qs'

import CardName from 'components/HiCard/CardName'
import HiPay from 'mixins/HiPay'

import {alert, toast, confirm, illustrate, login} from 'utils'

import {mapGetters, mapActions} from 'vuex'

import classes from './index.styl'

const VOUCHER_INST_SELECTOR = 'voucher-inst-selector'

export default require('./index.pug')({
  mixins: [HiPay],
  name: 'card-sales-detail',
  data() {
    const {auth, data} = this.$route.meta
    return {
      classes,
      agree: true,
      auth: !!auth,
      ...data
    }
  },
  computed: {
    ...mapGetters(['merchantName', 'authorized', 'isStaff', 'memberUrlPrefix']),
    bill() {
      return +Math.max(0, this.card.cardPrice -
        (!this.isStaff && this.cashVoucher ? this.cashVoucher.voucherValue : 0)).toFixed(2)
    }
  },
  methods: {
    ...mapActions(['resetRole']),
    selectVoucher() {
      const {cashVoucher} = this

      this.$modal.open({
        id: VOUCHER_INST_SELECTOR,
        component: import('components/HiSelector/VoucherInstSelector'),
        options: {
          show: true
        },
        props: {
          cardPrice: this.card.cardPrice,
          voucherInstId: cashVoucher && cashVoucher.voucherInstId,
          confirm: voucher => {
            this.cashVoucher = voucher
            this.$modal.close(VOUCHER_INST_SELECTOR)
          }
        }
      })
    },
    showIllustration() {
      illustrate(['1、一个手机号码一次只能购买一张会员卡，订单请发起支付后请于3日内完成付款，超时将自动取消订单；',
        '2、本卡购买成功后即绑定到购买人的会员账号中，购买成功后可以在“个人中心”查看会员卡，并可进行约课；',
        `3、使用本卡需遵守本场馆的会员守则，本卡的最终解释权归${this.merchantName}所有。`].join('<br>'))
    },
    offSales() {
      confirm({
        tipText: '确定不再售卖该会员卡吗？',
        confirm: () => this.$http.post('/card-sales/update-sell-state/OFF', [this.card.cardId])
          .then(() => toast({
            tipText: '撤售成功！',
            close: () => this.$router.replace('/card-sales')
          }))
      })
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
    afterPay(orderId) {
      this.$router.push(`/card-sales/pay-result/${orderId}`)
    },
    confirmPay() {
      if (this.isStaff) return alert('员工不可以购买会员卡哦！')

      this.createOrder()
    },
    async createOrder() {
      const {cashVoucher} = this
      const {data: {code, msg, data}} = await this.$http.post(`/card-sales/create-order/${this.card.cardId}`,
        qs.stringify({
          voucherInstId: cashVoucher && cashVoucher.voucherInstId
        }))

      if (code === '1000') {
        this.resetRole()
        return this.startPay()
      }

      if (code !== 'ok') return alert(msg)

      const {orderId, orderState} = data

      if (orderState === '2') return this.afterPay(orderId)

      this.pay(orderId, true, '/card-sales')
    },
    toggleAgree() {
      this.agree = !this.agree
    }
  },
  components: {
    CardName
  }
})

import {mapGetters, mapActions} from 'vuex'

import MbrCard from 'components/HiCard/MbrCard'
import HiPay from 'mixins/HiPay'

import {alert, pick, MAX_MONEY} from 'utils'

import classes from './start-payment.styl'

const DEFAULT = {orderId: null, realMoney: 0, payComment: null}

export default require('./start-payment.pug')({
  mixins: [HiPay],
  data() {
    let payment
    let {meta, params: {orderId, realMoney, payComment}} = this.$route

    try {
      orderId = orderId === 'null' ? null : orderId
      payment = +realMoney && realMoney < MAX_MONEY && (!payComment || payComment.length <= 12) ? {
        orderId,
        realMoney,
        payComment
      } : null
    } catch (e) {
      payment = null
    }

    payment || alert({
      tipText: '参数错误!',
      confirm: () => this.$router.replace('/')
    })

    return {
      ...DEFAULT,
      ...payment,
      classes,
      valueCards: meta.data,
      show: false,
      payMbrcardId: false
    }
  },
  computed: {
    ...mapGetters(['rem', 'hipayUrlPrefix', 'winHeight']),
    height() {
      return this.show
        ? Math.min(195 * this.valueCards.length * this.rem, this.winHeight - (64 * 2 + 140) * this.rem) + 'px' : 0
    },
    sortedValueCards() {
      return [
        ...this.filterValueCards(true),
        ...this.filterValueCards(false)
      ]
    }
  },
  methods: {
    ...mapActions(['resetRole']),
    filterValueCards(biggerOrLower) {
      const {realMoney, valueCards} = this
      return valueCards
        .filter(({availTimes, cardDiscount}) => realMoney * cardDiscount / 10 - availTimes <= 0 === biggerOrLower)
        .sort((x, y) => x.availTimes - y.availTimes > 0 === biggerOrLower)
    },
    chooseMbrCard(card) {
      const {mbrCardId, availTimes, cardDiscount} = card
      if (this.realMoney * cardDiscount / 10 > availTimes) return
      this.payMbrcardId = this.payMbrcardId !== mbrCardId && mbrCardId
    },
    async createOrder() {
      if (!this.payMbrcardId) return

      const {data: {code, msg, data}} = await this.$http.post(`/qr-order-buyer/create-order`,
        pick(this.$data, 'orderId', 'realMoney', 'payComment', 'payMbrcardId'))

      if (code === '1000') {
        this.resetRole()
        return this.$router.replace({path: '/login', query: {from: this.$route.fullPath}})
      }

      if (code !== 'ok') return alert(msg)

      const {orderId, orderState} = data

      this.orderId || (this.orderId = orderId)

      if (orderState === '2') return this.afterPay(orderId)

      this.pay(orderId)
    },
    afterPay() {
      location.href = this.hipayUrlPrefix + 'member/qr-pay-success/' + this.orderId
    }
  },
  components: {
    MbrCard
  }
})

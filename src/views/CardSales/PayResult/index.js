import Qrious from 'vue-qrious'

import CardName from 'components/HiCard/CardName'
import MbrCard from 'components/HiCard/MbrCard'

import HiPay from 'mixins/HiPay'

import {illustrate, resolveRoute} from 'utils'

import {mapGetters} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  mixins: [HiPay],
  name: 'pay-result',
  data() {
    const {data} = this.$route.meta

    return {
      classes,
      ...data,
      orderState: +data.orderState
    }
  },
  created() {
    const id = setInterval(() => {
      if (this.expiredSeconds) {
        --this.expiredSeconds
      } else {
        clearInterval(id) || (this.card ? this.orderState = 4 : resolveRoute(this.$router, '/member-card'))
      }
    }, 1000)

    if (this.mbrCard && this.orderState === 4) resolveRoute(this.$router, '/member-card')
  },
  computed: {
    ...mapGetters(['hipayUrlPrefix', 'memberUrlPrefix', 'authorized', 'isStaff'])
  },
  methods: {
    goSubscribeSchedule() {
      if (this.wxAttention) {
        location.href = this.memberUrlPrefix + 'member-subscribe/subscribe-course'
      } else {
        illustrate(`<div class="${classes.illustrate}"><div class="${classes.title}">` +
          `长按二维码关注场馆公众号订课</div><img src="${this.$refs.qrious.src}"/></div>`)
      }
    },
    goOrderList() {
      location.href = this.memberUrlPrefix + 'member/order-list'
    },
    continuePay() {
      this.pay(this.orderId, true)
    },
    afterPay() {
      this.orderState = 2
    },
    goOrderDetail() {
      location.href = this.hipayUrlPrefix + 'order-detail/' + this.orderId
    }
  },
  components: {
    CardName,
    MbrCard,
    Qrious
  }
})

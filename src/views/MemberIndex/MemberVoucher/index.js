import {mapGetters} from 'vuex'

import HiVoucher from 'components/HiVoucher'

import {illustrate} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-voucher',
  data() {
    return {
      classes,
      vouchers: this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['memberUrlPrefix', 'merchantName'])
  },
  methods: {
    getVoucher() {
      location.href = this.memberUrlPrefix + 'expvoucher/activity-list'
    },
    showPrompt() {
      illustrate(['1、现金券只适用于系统内购买本场馆会员卡时使用；',
        '2、购买会员卡时每次限用1张；',
        '3、若订单取消未支付，现金券将退还到您的账户；',
        `4、现金券不兑换，不找零，不得赠送，使用时最终解释权归${this.merchantName}所有。`].join('<br>'))
    }
  },
  components: {
    HiVoucher
  }
})

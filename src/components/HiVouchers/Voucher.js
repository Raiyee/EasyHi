import {mapGetters} from 'vuex'

import classes from './voucher.styl'

export default require('./voucher.pug')({
  props: ['voucher'],
  data() {
    return {
      classes
    }
  },
  computed: {
    ...mapGetters(['memberUrlPrefix', 'isStaffS']),
    voucherState: function () {
      const state = this.voucher.state

      return state === 'noStocks' ? 'used-up-bg'
        : state === 'expired' ? 'unavailableBg'
        : 'availableBg'
    }
  },
  methods: {
    goSubscribeSchedule() {
      location.href = this.memberUrlPrefix + 'member-subscribe/subscribe-course'
    }
  }
})

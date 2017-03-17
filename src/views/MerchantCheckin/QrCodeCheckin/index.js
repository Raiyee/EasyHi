import {mapGetters} from 'vuex'

import {toast, closeModal, initWxJs} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'qr-code-checkin',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['coachAlias', 'merchantUrlPrefix'])
  },
  methods: {
    goScheduleDetail(scheduleId) {
      location.href = this.merchantUrlPrefix + 'merchant-checkin/detail/' + scheduleId + '/' + this.$route.params.userId
    },
    async toggleCheckin(subscribe) {
      await this.$http.post('/merchant-checkin/check-single', {
        subscribeId: subscribe.subscribeId,
        operatorType: +!subscribe.subscribeChecked + ''
      })

      toast({
        tipText: `${subscribe.subscribeChecked ? '取消' : '签到'}成功`,
        close: () => {
          this.changeCheckin(subscribe, subscribe.subscribeChecked)
          closeModal()
        }
      })
    },
    changeCheckin(subscribe, subscribeChecked) {
      const {subscribeId, scheduleId} = subscribe
      this.subscribes.forEach(sub => {
        if (subscribeId === sub.subscribeId) sub.subscribeChecked = !sub.subscribeChecked
        if (scheduleId === sub.scheduleId) {
          sub.scheduleCheckedNum += subscribe.subscribeNum * (subscribeChecked ? -1 : 1)
        }
      })
    },
    goCheckinList() {
      location.href = this.merchantUrlPrefix + 'merchant-checkin/list'
    },
    goSingleCheckin() {
      initWxJs().then(() => this.$wx.scanQRCode())
    }
  }
})

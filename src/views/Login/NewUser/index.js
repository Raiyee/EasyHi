import Qrious from 'vue-qrious'

import HiLogin from 'components/HiLogin'

import {mapGetters} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'new-user',
  data() {
    const {params, meta} = this.$route

    return {
      classes,
      userId: params.userId,
      result: null,
      ...meta.data
    }
  },
  computed: {
    ...mapGetters(['theme', 'merchantName', 'merchantLogo', 'authorized', 'merchantAddress', 'serviceMobile']),
    gift() {
      return this.inviteeRewardId ? ' "' + this.inviteeRewardContent + '" 体验券1张' : this.inviteeRewardContent
    },
    promptText() {
      return this.authorized ? '关注我们' : '进入我们的公众号'
    },
    confirmText() {
      return this.inviteeRewardContent ? '领取好礼' : '登录'
    }
  },
  methods: {
    confirm() {
      if (!this.inviteeRewardId) {
        this.result = 'successHas'
      } else {
        this.$http.post('/invite/accept-the-prize')
          .then(({data: {code}}) => {
            if (code === 'error') this.result = 'success'
            if (code === 'ok') this.result = 'voucher'
          })
      }
    }
  },
  components: {
    HiLogin,
    Qrious
  }
})

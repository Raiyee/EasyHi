import {mapGetters} from 'vuex'

import InviterReward from './InviterReward'

import {alert, isAllUnique, toast} from 'utils'

import classes from './index.styl'

const VOUCHER_SELECTOR = 'voucher-selector'

export default require('./index.pug')({
  name: 'reward-setting',
  data() {
    const metaData = this.$route.meta.data

    const {inviterReward, inviteeRewardId, inviteeRewardContent} = metaData

    const inviteeRewardVoucher = inviteeRewardId ? {
      voucherId: inviteeRewardId,
      voucherName: inviteeRewardContent,
      voucherDescription: metaData.inviteeRewardDescription,
      voucherTimes: metaData.inviteeRewardTimes,
      voucherExpiredType: metaData.inviteeRewardExpiredType,
      voucherExpiredLimit: metaData.inviteeRewardExpiredLimit,
      voucherExpiredRange: metaData.inviteeRewardExpiredRange
    } : null

    return {
      classes,
      inviterReward: inviterReward ? inviterReward.map(({rewardThreshold, rewardContent}, index) => ({
        rewardId: index,
        rewardThreshold,
        rewardContent
      })) : [],
      inviteeRewardVoucher,
      inviteeRewardContent
    }
  },
  computed: {
    ...mapGetters(['isEnterprise'])
  },
  destroyed() {
    this.$modal.close(VOUCHER_SELECTOR, true)
  },
  methods: {
    isInviterRewardValid() {
      const {inviterReward} = this.$refs

      return !inviterReward || (inviterReward
        .find(({rewardThreshold, rewardContent}) => !+rewardThreshold || !rewardContent)
        ? !alert('请填写完已有奖励阶梯再添加')
        : isAllUnique(inviterReward, 'rewardThreshold') || !alert('奖励阶梯的人数请勿重复'))
    },
    addInviterReward() {
      if (!this.isInviterRewardValid()) return
      this.inviterReward.push({rewardId: +new Date()})
    },
    setInviteeReward() {
      const self = this
      this.$modal.open({
        id: VOUCHER_SELECTOR,
        component: import('components/HiSelector/VoucherSelector'),
        options: {
          show: true
        },
        props: {
          single: true,
          async confirm(voucher) {
            self.inviteeRewardVoucher = voucher
            this.$modal.close(VOUCHER_SELECTOR, true)
          }
        }
      })
    },
    removeInviterReward(index) {
      this.inviterReward.splice(index, 1)
    },
    removeInviteeReward() {
      this.inviteeRewardVoucher = null
    },
    async publishInvitationReward() {
      if (!this.isInviterRewardValid()) return
      const {inviterReward} = this.$refs
      let {inviteeRewardVoucher} = this
      inviteeRewardVoucher = inviteeRewardVoucher || {}
      await this.$http.post('/invite/set-invitation', {
        inviterReward: inviterReward && inviterReward
          .map(({rewardThreshold, rewardContent}) => ({
            rewardThreshold,
            rewardContent
          })),
        inviteeRewardContent: this.isEnterprise ? inviteeRewardVoucher.voucherName : this.inviteeRewardContent,
        inviteeRewardId: inviteeRewardVoucher.voucherId,
        inviteeRewardDescription: inviteeRewardVoucher.voucherDescription,
        inviteeRewardTimes: inviteeRewardVoucher.voucherTimes,
        inviteeRewardExpiredType: inviteeRewardVoucher.voucherExpiredType,
        inviteeRewardExpiredLimit: inviteeRewardVoucher.voucherExpiredLimit,
        inviteeRewardExpiredRange: inviteeRewardVoucher.voucherExpiredRange
      })

      toast({
        tipText: '发布成功',
        close: () => this.$router.push('/invitation-reward')
      })
    }
  },
  components: {
    InviterReward
  },
  validator: {
    inviteeRewardContent: {
      maxLength: 100
    }
  }
})

import classes from './inviter-reward.styl'

export default require('./inviter-reward.pug')({
  props: {
    reward: Object
  },
  data() {
    const {reward: {rewardThreshold = '', rewardContent = ''}} = this
    return {
      classes,
      rewardThreshold,
      rewardContent
    }
  },
  computed: {
    thresholdError() {
      return this.$v.rewardThreshold.$dirty && !this.$v.rewardThreshold.min
    }
  },
  validator: {
    rewardThreshold: {
      integer: true,
      min: 1,
      maxLength: 3
    },
    rewardContent: {
      maxLength: 100
    }
  }
})

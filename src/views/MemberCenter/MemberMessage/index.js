const MSG_TYPES = {
  S: '上课提醒',
  Q: '取消预订消息',
  Y: '预订消息',
  W: '温馨提示',
  B: '卡变更提醒',
  D: '到期提醒',
  X: '私教课时间修改',
  Z: '中奖提醒',
  G: '购买成功提醒',
  R: '退款提醒'
}

export default {
  ...require('./index.pug'),
  name: 'memberMessage',
  data() {
    return {
      classes: require('./index.styl'),
      ...this.$route.meta.data
    }
  },
  filters: {
    msgType: type => MSG_TYPES[type] || '消息提醒'
  }
}

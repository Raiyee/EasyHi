import {resetType, reSetMsg} from './MemberMessage'

export default {
  ...require('./index.pug'),
  name: 'memberMessage',
  data() {
    const data = this.$route.meta.data.data
    return {
      classes: require('./index.styl'),
      msg: reSetMsg(data.msg),
      noMessage: data.noMessage
    }
  },
  filters: {
    resetType
  }
}

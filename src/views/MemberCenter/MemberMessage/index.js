import {resetMsgType, resetMsg} from './util'

export default {
  ...require('./index.pug'),
  name: 'memberMessage',
  data() {
    const data = this.$route.meta.data.data
    return {
      classes: require('./index.styl'),
      msg: resetMsg(data.msg),
      noMessage: data.noMessage
    }
  },
  filters: {
    resetMsgType
  }
}

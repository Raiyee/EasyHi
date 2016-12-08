import {resetMsgType, resetMsg} from './util'

export default {
  ...require('./index.pug'),
  name: 'memberMessage',
  data() {
    const data = this.$route.meta.data
    return {
      classes: require('./index.styl'),
      msg: resetMsg(data.msg)
    }
  },
  filters: {
    resetMsgType
  }
}

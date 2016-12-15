import {isString} from 'utils'
import Tab from './tab.js'

export default require('./index.pug')({
  name: 'memberSubscription',
  data() {
    return {
      tabName: undefined,
      classes: require('./tab.styl'),
      ...this.$route.meta.data
    }
  },
  methods: {
    changeTab: function(item, index, e) {
      console.log(item, index)
      this.tabName = isString(item) ? item : item.tabName
    }
  },
  components: {
    Tab
  }
})

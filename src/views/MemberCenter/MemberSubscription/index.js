import {isString} from 'utils'
import Tab from './tab.js'
import classes from './index.styl'

export default require('./index.pug')({
  name: 'memberSubscription',
  data() {
    return {
      tabName: undefined,
      open: false,
      classes,
      ...this.$route.meta.data
    }
  },
  methods: {
    changeTab: function (item, index, e) {
      console.log(item, index)
      this.tabName = isString(item) ? item : item.tabName
    },
    chooseMenu() {
      console.log('chooseMenu')
      this.open = !this.open
    },
    changeMenu() {
      console.log('changeMenu')
      this.open = !this.open
    }
  },
  components: {
    Tab
  }
})

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
    toggleTab: function (item, index) {
      console.log(index)
      this.tabName = item.tabName || item
    },
    toggleMenu() {
      this.open = !this.open
    },
    changeMenu() {
      this.open = !this.open
    }
  },
  components: {
    Tab
  }
})

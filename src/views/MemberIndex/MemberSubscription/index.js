import HiTab from 'components/HiTab'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-subscription',
  data() {
    return {
      text: null,
      open: false,
      classes,
      ...this.$route.meta.data
    }
  },
  methods: {
    toggleTab: function (index, value, text) {
      console.log(index)
      this.text = text
    },
    toggleMenu() {
      this.open = !this.open
    },
    changeMenu() {
      this.open = !this.open
    }
  },
  components: {
    HiTab
  }
})

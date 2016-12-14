import {mapGetters} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-index',
  data: () => ({classes}),
  computed: {
    ...mapGetters(['winHeight'])
  },
  mounted() {
    this.$util.ensure(Object.values(this.$refs), 'animationend', (e, el) => {
      this.$util.removeClass(e ? e.target : el, 'animated')
    }, 1600)
  }
})

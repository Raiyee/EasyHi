import {mapGetters} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-index',
  data: () => ({classes}),
  computed: {
    ...mapGetters(['winHeight'])
  },
  methods: {
    animationEnd(e) {
      this.$util.removeClass(e.target, 'animated')
    }
  }
})

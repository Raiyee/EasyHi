import {mapGetters} from 'vuex'

import classes from './index.styl'

import {ensure, removeClass} from 'utils'

export default require('./index.pug')({
  name: 'home',
  data: () => ({classes}),
  computed: {
    ...mapGetters(['winHeight'])
  },
  mounted() {
    ensure(Object.values(this.$refs), 'animationend', (e, el) => {
      removeClass(e ? e.target : el, 'animated')
    }, 1600)
  }
})

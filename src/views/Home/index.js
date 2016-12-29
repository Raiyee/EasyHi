import classes from './index.styl'

import {ensure, removeClass} from 'utils'

export default require('./index.pug')({
  name: 'home',
  data: () => ({classes}),
  mounted() {
    ensure(Object.values(this.$refs), 'animationend', (e, el) => {
      removeClass(e ? e.target : el, 'animated')
    }, 1600)
  }
})

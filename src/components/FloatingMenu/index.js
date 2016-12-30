import {mapGetters} from 'vuex'
import {dispatch} from 'store'

import classes from './index.styl'

export default require('./index.pug')({
  data() {
    return {
      classes
    }
  },
  computed: {
    ...mapGetters(['rem', 'currentRole', 'menuOpen', 'menuShow', 'menuType']),
    width() {
      const currentRole = this.currentRole
      const width = this.menuType === '2'
        ? 180 : this.menuType === '3'
        ? 240 : (currentRole === 'MERCHANT' || currentRole === 'SERVICE' || currentRole === 'MANAGER')
        ? 295 : 180
      return (this.menuOpen ? width : 54) * this.rem
    }
  },
  methods: {
    toggleMenu(e) {
      e.stopPropagation()
      dispatch('setMenuOpen', !this.menuOpen)
    }
  }
})

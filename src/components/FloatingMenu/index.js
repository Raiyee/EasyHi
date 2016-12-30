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
    ...mapGetters(['rem', 'currentRole', 'isAdmin', 'isStaff', 'menuOpen', 'menuShow', 'subscribeType']),
    width() {
      return (this.menuOpen ? (this.menus.length + 1) * 55 : 54) * this.rem
    },
    menus() {
      let menus = [{text: '订课', link: '#'}]
      if (this.isAdmin) {
        if (this.subscribeType !== 0) {
          return menus.concat([
            {text: this.subscribeType === 1 ? '调课' : '私教管理', link: '#'},
            {text: '换肤'},
            {text: '工作台', link: '#'}])
        }
        return menus.concat([
          {text: '菜单'},
          {text: '工作台', link: '#'}
        ])
      }
      return menus.concat([{text: '我的', link: (this.isStaff && !this.isAdmin) ? '#' : '#'}])
    }
  },
  methods: {
    toggleMenu(e) {
      e.stopPropagation()
      dispatch('setMenuOpen', !this.menuOpen)
    }
  }
})

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
      const width = this.menuType === 2
        ? 180 : this.menuType === 3
        ? 240 : this.isAdmin
        ? 295 : 180
      return (this.menuOpen ? width : 54) * this.rem
    },
    menus() {
      if(this.isAdmin) {
        if(this.subscribeType !== 0) {
          return [{text: '订课', link: '#'},
            {text: this.subscribeType === 1 ? '调课' : '私教管理', link: '#'},
            {text: '换肤'},
            {text: '工作台', link: '#'}
          ]
        }else {
          return [{text: '订课', link: '#'},
            {text: '菜单'},
            {text: '工作台', link: '#'}
          ]
        }
      } else {
        return [{text: '订课', link: '#'},
          {
            text: '我的',
            link: (this.isStaff && !this.isAdmin) ? '#' : '#'
          }
        ]
      }
    }
  },
  methods: {
    toggleMenu(e) {
      e.stopPropagation()
      dispatch('setMenuOpen', !this.menuOpen)
    }
  }
})

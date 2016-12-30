import {mapGetters, mapActions} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  data: () => ({classes}),
  computed: {
    ...mapGetters(['rem', 'currRole', 'isAdmin', 'menuOpen', 'menuShow', 'subscribeType']),
    width() {
      return (58 + +this.menuOpen * this.menus.length * 60) * this.rem
    },
    menus() {
      const menus = [{text: '订课', link: '#'}]
      const indexLink = `/${this.currRole}-index`

      if (!this.isAdmin) {
        menus.push({text: '我的', link: indexLink})
      } else if (this.subscribeType) {
        menus.push(
          {text: this.subscribeType - 1 ? '私教管理' : '调课', link: '#'},
          {text: '换肤', action: 'changeTheme'},
          {text: '工作台', link: indexLink})
      } else {
        menus.push(
          {text: '菜单', action: 'showAllMenus'},
          {text: '工作台', link: indexLink}
        )
      }

      return menus
    }
  },
  methods: {
    ...mapActions(['toggleMenuOpen']),
    toggleMenu(e) {
      e.stopPropagation()
      this.toggleMenuOpen(!this.menuOpen)
    },
    triggerMenu(action) {
      this[action]()
    },
    changeTheme() {
      console.log('changeTheme')
    },
    showAllMenus() {
      console.log('showAllMenus')
    }
  }
})

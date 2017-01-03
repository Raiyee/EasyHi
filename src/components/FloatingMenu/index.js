import {mapGetters, mapActions} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  data: () => ({classes}),
  computed: {
    ...mapGetters(['rem', 'currRole', 'isAdmin', 'menuOpen', 'menuShow', 'subscribeType', 'menuInactive']),
    width() {
      return (50 + +this.menuOpen * this.menus.length * 60) * this.rem + 'px'
    },
    menus() {
      const menus = [{text: '订课', link: '/member-subscribe', inactive: this.menuInactive === 'SUBSCRIBE_CLASS'}]
      const indexLink = `/${this.currRole}-index`

      if (!this.isAdmin) {
        menus.push({text: '我的', link: indexLink, inactive: this.menuInactive === 'MINE'})
      } else if (this.subscribeType) {
        menus.push(
          {text: this.subscribeType - 1 ? '私教管理' : '调课', link: '/'},
          {text: '换肤', action: this.changeTheme},
          {text: '工作台', link: indexLink}
        )
      } else {
        menus.push(
          {text: '菜单', action: this.showAllMenus},
          {text: '工作台', link: indexLink, inactive: this.menuInactive === 'WORKBENCH'}
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
    changeTheme() {
      console.log('changeTheme')
    },
    showAllMenus() {
      console.log('showAllMenus')
    }
  }
})

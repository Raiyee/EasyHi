import {mapGetters, mapActions} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  data: () => ({classes}),
  computed: {
    ...mapGetters(['rem', 'currRole', 'isAdmin', 'menuOpen', 'menuShow', 'subscribeType']),
    width() {
      return (50 + +this.menuOpen * this.menus.length * 60) * this.rem + 'px'
    },
    menus() {
      const route = this.$route
      const menus = [{text: '订课', link: '/member-subscribe', inactive: route.name === 'memberSubscribe'}]
      const indexLink = `/${this.currRole}-index`

      if (!this.isAdmin) {
        menus.push({text: '我的', link: indexLink, inactive: route.fullPath.indexOf(indexLink) !== -1})
      } else if (this.subscribeType) {
        menus.push(
          {text: this.subscribeType - 1 ? '私教管理' : '调课', link: '/'},
          {text: '换肤', action: this.changeTheme},
          {text: '工作台', link: indexLink, inactive: route.fullPath.indexOf(indexLink) !== -1}
        )
      } else {
        menus.push(
          {text: '菜单', action: this.showAllMenus},
          {text: '工作台', link: indexLink}
        )
      }

      return menus
    }
  },
  methods: {
    ...mapActions(['toggleMenuOpen']),
    toggleMenu() {
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

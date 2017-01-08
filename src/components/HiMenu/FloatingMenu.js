import {mapGetters, mapActions} from 'vuex'

import {MENUS_ID, toggleModal} from 'utils'

import classes from './floating-menu.styl'

export default require('./floating-menu.pug')({
  name: 'floating-menu',
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
      try {
        toggleModal(MENUS_ID)
      } catch (e) {
        this.$modal.open({
          id: MENUS_ID,
          component: System.import('./AllMenus'),
          options: {
            backdrop: false,
            show: true,
            destroy: false
          }
        })
      }
    }
  }
})

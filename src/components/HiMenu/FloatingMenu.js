import {mapGetters, mapActions} from 'vuex'

import {MENUS_ID, toggleModal} from 'utils'

import classes from './floating-menu.styl'

export default require('./floating-menu.pug')({
  name: 'floating-menu',
  data: () => ({classes}),
  computed: {
    ...mapGetters(['rem', 'currRole', 'isAdmin', 'isService',
      'menuOpen', 'menuShow', 'subscribeType', 'memberUrlPrefix', 'merchantUrlPrefix']),
    width() {
      return (50 + +this.menuOpen * this.menus.length * 60) * this.rem + 'px'
    },
    menus() {
      const route = this.$route
      const {subscribeType, currRole, isAdmin, isService, merchantUrlPrefix} = this

      const menus = [{
        text: '订课',
        link: '/subscribe-index',
        inactive: route.name === 'subscribeIndex'
      }]

      const indexLink = `/${currRole}-index`

      if (!isAdmin && !isService) {
        menus.push({text: '我的', link: indexLink, inactive: route.name === 'memberIndex'})
      } else if (subscribeType) {
        menus.push(
          {text: subscribeType - 1 ? '私教管理' : '调课',
            link: merchantUrlPrefix + (subscribeType - 1 ? 'private-manage/index' : 'scheduling/index')},
          {text: '换肤', action: this.changeSkin},
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
    changeSkin() {
      this.$modal.open({
        id: 'change-skin',
        component: import('./ChangeSkin'),
        options: {
          show: true,
          backdrop: true
        }
      })
    },
    showAllMenus() {
      try {
        toggleModal(MENUS_ID)
      } catch (e) {
        this.$modal.open({
          id: MENUS_ID,
          component: import('./AllMenus'),
          options: {
            show: true
          }
        })
      }
    }
  }
})

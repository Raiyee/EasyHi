import qs from 'qs'
import {mapActions} from 'vuex'

import ModalItem from 'components/HiModal/ModalItem'

import classes from './change-skin.styl'

export default require('./change-skin.pug')({
  data() {
    const {style, theme} = this.$store.getters
    return {
      classes,
      style,
      theme,
      editingStyle: style,
      editingTheme: theme,
      themes: {
        red: '胭脂红', blue: '杜若蓝', purple: '紫罗兰', green: '忍冬青', navy: '井黛蓝'
      }
    }
  },
  methods: {
    ...mapActions(['toggleSkin']),
    cancelEdit() {
      this.$modal.close()
      this.editingStyle = this.style
      this.editingTheme = this.theme
    },
    async confirmEdit() {
      const params = {
        style: this.editingStyle,
        theme: this.editingTheme
      }

      await this.$http.post('/merchant-website/save-theme', qs.stringify(params))

      this.toggleSkin(params)

      location.reload()
    }
  },
  components: {
    ModalItem
  }
})

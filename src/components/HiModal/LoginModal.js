import ModalItem from 'components/HiModal/ModalItem'
import Login from 'components/HiLogin'

import classes from './login-modal.styl'

export default require('./login-modal.pug')({
  name: 'login-modal',
  props: {
    close: Function,
    confirm: Function,
    confirmText: true
  },
  methods: {
    closeLogin: function () {
      this.close ? this.close(...arguments) : this.$modal.close()
    },
    confirmLogin: function () {
      this.confirm ? this.confirm(...arguments) : this.$modal.close()
    }
  },
  data: () => ({classes}),
  components: {
    ModalItem,
    Login
  }
})

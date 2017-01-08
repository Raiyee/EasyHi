import ModalItem from 'components/HiModal/ModalItem'
import Login from 'components/HiLogin'

import classes from './login-modal.styl'

export default require('./login-modal.pug')({
  name: 'login-modal',
  props: {
    transition: [Boolean, String],
    close: Function,
    confirm: Function,
    confirmText: {
      type: String,
      default: '立即下单'
    }
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

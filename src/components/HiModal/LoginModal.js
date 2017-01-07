import ModalItem from 'components/HiModal/ModalItem'
import Login from 'components/HiLogin'
import classes from './login-modal.styl'
import {alert} from 'utils'

export default require('./login-modal.pug')({
  name: 'login-modal',
  props: {
    transition: [Boolean, String],
    header: [Boolean]
  },
  methods: {
    cancel: function () {
      this.$modal.close()
    },
    confirm: function () {
      alert('下单成功')
      this.$modal.close()
    }
  },
  data: () => ({classes}),
  components: {
    ModalItem,
    Login
  }
})

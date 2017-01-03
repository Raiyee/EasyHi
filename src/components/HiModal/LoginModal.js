import ModalItem from 'components/HiModal/ModalItem'

import Login from 'views/Login'

import classes from './login-modal.styl'

export default require('./login-modal.pug')({
  props: {
    transition: [Boolean, String]
  },
  data: () => ({classes}),
  components: {
    ModalItem,
    Login
  }
})

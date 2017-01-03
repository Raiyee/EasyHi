import Login from 'views/Login'
import ModalItem from 'components/HiModal/ModalItem'
import classes from './index.styl'

export default require('./index.pug')({
  props: {
    bodyMsg: {
      type: String,
      required: true
    },
    transition: [Boolean, String]
  },
  data() {
    return {
      classes
    }
  },
  components: {
    Login,
    ModalItem
  }
})

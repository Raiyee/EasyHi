import Login from 'views/Login'
import ModalItem from 'components/HiModal/ModalItem'
import classes from './index.styl'

export default require('./index.pug')({
  props: {
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

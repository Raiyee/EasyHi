import {mapGetters} from 'vuex'
import {maxLength} from 'v-validator/validators'

import ModalItem from './ModalItem'

import {REQUIRED_FUNCTION} from 'utils'

import classes from './reply-modal.styl'

export default require('./reply-modal.pug')({
  props: {
    placeholder: String,
    maxLength: {
      type: Number,
      default: 200
    },
    confirm: REQUIRED_FUNCTION
  },
  data() {
    return {
      classes,
      reply: ''
    }
  },
  computed: {
    ...mapGetters(['rem', 'winHeight']),
    height() {
      return this.winHeight - 127 * this.rem + 'px'
    }
  },
  components: {
    ModalItem
  },
  validator() {
    return {
      reply: {
        maxLength: () => maxLength(this.maxLength).call(this, this.reply, 'reply')
      }
    }
  }
})

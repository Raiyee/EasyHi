import ModalItem from 'components/HiModal/ModalItem'
import {reverse} from 'utils'

let modalId

export default require('./actual-modal.pug')({
  props: {
    bodyMsg: {
      type: String,
      required: true
    },
    transition: [Boolean, String]
  },
  data() {
    return {msg: 'My name is msg'}
  },
  components: {
    ModalItem
  },
  methods: {
    // close() {
    //   this.$modal.close(modalId)
    // },
    confirm() {
      modalId = this.$modal.open({
        id: modalId,
        component: import('./ActualModal'),
        options: {
          backdrop: true,
          destroy: true,
          show: true
        },
        props: {
          bodyMsg: reverse(this.bodyMsg),
          transition: this.transition
        }
      })
    },
    reverseMsg() {
      this.msg = reverse(this.msg)
    }
  }
})

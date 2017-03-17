import ModalItem from 'components/HiModal/ModalItem'

import {mapGetters} from 'vuex'

import {REQUIRED_FUNCTION} from 'utils'

import classes from './follow-up.styl'

export default require('./follow-up.pug')({
  name: 'follow-up',
  props: {
    confirm: REQUIRED_FUNCTION
  },
  data() {
    return {
      classes,
      followType: true,
      remark: ''
    }
  },
  computed: {
    ...mapGetters(['rem', 'winHeight']),
    height() {
      return this.winHeight - 64 * this.rem + 'px'
    }
  },
  methods: {
    checkBeInvited() {
      const {followType} = this
      this.followType = followType || !followType
    },
    checkEnterTheStore() {
      const {followType} = this
      this.followType = followType ? !followType : followType
    },
    confirmModal() {
      this.confirm(...arguments)
    }
  },
  components: {
    ModalItem
  }
})

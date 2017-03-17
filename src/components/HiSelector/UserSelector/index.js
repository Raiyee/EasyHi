import {mapGetters} from 'vuex'

import ModalItem from 'components/HiModal/ModalItem'
import InputSearch from 'components/HiPackages/InputSearch'

import {remove} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  props: {
    headerText: String,
    highlightText: String,
    highlightUsers: {
      type: Array,
      default: []
    },
    users: Object,
    icons: Array,
    single: {
      type: Boolean,
      default: true
    },
    confirm: Function
  },
  data() {
    return {
      classes,
      bodyStyle: {
        height: 'auto'
      },
      selected: [],
      currUsers: this.users,
      currHighlightUsers: this.highlightUsers,
      onConfirm: this.confirm.bind(this)
    }
  },
  computed: {
    ...mapGetters(['winHeight', 'rem']),
    height() {
      return Math.ceil(this.winHeight - 63 * this.rem) + 'px'
    }
  },
  methods: {
    onEnter(val) {
      const newUsers = {}
      Object.entries(this.users).forEach(([key, value]) => {
        newUsers[key] = value.filter(({userName, userMobile}) => {
          return userName.includes(val) || (userMobile + '').includes(val)
        })
      })
      this.currUsers = newUsers
      this.currHighlightUsers = []
    },
    onCancel() {
      this.currUsers = this.users
      this.currHighlightUsers = this.highlightUsers
    },
    onSelect(userId) {
      this.selected.indexOf(userId) !== -1 ? remove(this.selected, userId)
        : this.single ? this.selected = [userId] : this.selected.push(userId)
    }
  },
  components: {
    ModalItem,
    InputSearch
  }
})

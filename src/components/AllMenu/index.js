import {mapGetters} from 'vuex'

import {alert, closeModal} from 'utils'

import ModalItem from 'components/HiModal/ModalItem'

import classes from './index.styl'

export default require('./index.pug')({
  data() {
    return {
      classes,
      isEnterprise: true
    }
  },
  computed: {
    ...mapGetters(['rem', 'winHeight']),
    height() {
      return this.winHeight - 82 * this.rem + 'px'
    }
  },
  components: {
    ModalItem
  },
  methods: {
    alertTip() {
      return alert('您当前使用的服务为"创业版"，需升级"企业版"方可使用此功能哦。')
    },
    closeMenu() {
      closeModal()
    }
  }
})

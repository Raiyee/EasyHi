import {mapGetters} from 'vuex'

import HiTooltip from 'components/HiTooltip'
import Qrious from 'vue-qrious'

import {illustrate} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'invitation-reward',
  data() {
    return {
      ...this.$route.meta.data,
      classes
    }
  },
  computed: {
    ...mapGetters(['isStaffS'])
  },
  methods: {
    showQrcode() {
      illustrate({
        tipText: this.$refs.qrious.innerHTML,
        class: classes.illustrate
      })
    }
  },
  components: {
    HiTooltip,
    Qrious
  }
})

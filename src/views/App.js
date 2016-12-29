import {mapGetters} from 'vuex'

import HiLoading from 'components/HiLoading'
import HiProgress from 'components/HiProgress'
import HiModal from 'components/HiModal'

export default require('./App.pug')({
  data: () => ({transition: 'slide-fade'}),
  computed: {
    ...mapGetters(['progress']),
    keepAlive() {
      let keepAlive = this.$route.meta.keepAlive
      return keepAlive == null || keepAlive
    }
  },
  components: {
    HiLoading,
    HiProgress,
    HiModal
  }
})

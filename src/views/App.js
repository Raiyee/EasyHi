import {mapGetters} from 'vuex'
import {dispatch} from 'store'

import HiLoading from 'components/HiLoading'
import HiProgress from 'components/HiProgress'
import HiModal from 'components/HiModal'
import FloatingMenu from 'components/FloatingMenu'

export default require('./App.pug')({
  data: () => ({transition: 'slide-fade'}),
  computed: {
    ...mapGetters(['progress']),
    keepAlive() {
      let keepAlive = this.$route.meta.keepAlive
      return keepAlive == null || keepAlive
    }
  },
  mounted() {
    document.onclick = function () {
      dispatch('setMenuOpen', false)
    }
  },
  components: {
    HiLoading,
    HiProgress,
    HiModal,
    FloatingMenu
  }
})

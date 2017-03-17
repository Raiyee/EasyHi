import qs from 'qs'
import {mapGetters} from 'vuex'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-index',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['mobile', 'currentRole', 'serviceMobile', 'memberUrlPrefix', 'sceneUrlPrefix', 'tcode'])
  },
  mounted() {
    this.newCashVouchers.length && this.showCashVouchers()
  },
  methods: {
    showCashVouchers() {
      this.$modal.open({
        component: import('./NewCashVouchers'),
        options: {
          backdrop: 'static',
          destroy: true,
          show: true
        },
        props: {
          newCashVouchers: this.newCashVouchers
        }
      })
    },
    async enterShow() {
      await this.$http.post('/membercenter/update-read-times', qs.stringify({
        sceneId: this.sceneId,
        isRead: true
      }))
      location.href = this.sceneUrlPrefix + this.tcode + '/tshow/' + this.sceneId
    },
    resolveRoute(fragment) {
      location.href = this.memberUrlPrefix + fragment
    }
  }
})

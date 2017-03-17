import {mapGetters} from 'vuex'

import HiTooltip from 'components/HiTooltip'

import {picker, toggleModal, resolveRoute, PICKER_ID, REQUIRED_STRING} from 'utils'

import classes from './index.styl'

const FILTERS = ['所有已邀请', '已办卡', '未办卡']

export default require('./index.pug')({
  props: {
    userId: REQUIRED_STRING
  },
  data() {
    return {
      classes,
      filterIndex: 0,
      ...this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['merchantUrlPrefix']),
    allInvitations() {
      const {invitations} = this
      return [
        invitations,
        invitations.filter(invitation => invitation.hasMbrCard),
        invitations.filter(invitation => !invitation.hasMbrCard)
      ]
    },
    allFilterTexts() {
      return FILTERS.map((filter, index) => `${filter}(${this.allInvitations[index].length})`)
    }
  },
  destroyed() {
    this.$modal.close(PICKER_ID, true)
  },
  methods: {
    gotoUserDetail(userId, isVisitor) {
      resolveRoute(this.$router, isVisitor ? `/visitor-detail/${userId}`
        : `${this.merchantUrlPrefix}member-manage/member-detail/${userId}`)
    },
    filterInvitations() {
      let opened = true
      try {
        toggleModal(PICKER_ID)
      } catch (e) {
        opened = false
      }

      if (opened) return

      const self = this
      picker({
        pickers: [{
          values: this.allFilterTexts
        }],
        confirm() {
          self.filterIndex = this.result[0][0]
          this.$modal.close()
        }
      }, {
        destroy: false
      })
    }
  },
  components: {
    HiTooltip
  }
})

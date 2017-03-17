import {mapGetters} from 'vuex'

import HiTab from 'components/HiTab'

import MbrCard from '../../../components/HiCard/MbrCard'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'member-card',
  data() {
    const result = this.$route.meta.data
    return {
      classes,
      items: [
        `可用会员卡(${result.enableCardList.length})`,
        `不可用会员卡(${result.disableCardList.length})`
      ],
      ...result,
      enabled: true
    }
  },
  computed: {
    ...mapGetters(['appWidth']),
    cards() {
      return this.enabled ? this.enableCardList : this.disableCardList
    },
    maxWidth() {
      return {
        maxWidth: this.appWidth + 'px'
      }
    }
  },
  methods: {
    toggleTab(index) {
      this.enabled = !index
    }
  },
  components: {
    HiTab,
    MbrCard
  }
})

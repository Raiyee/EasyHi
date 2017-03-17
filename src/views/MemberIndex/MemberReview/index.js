import {mapGetters} from 'vuex'

import HiTab from 'components/HiTab'
import HiReview from 'components/HiReview'

import classes from './index.styl'

export default require('./index.pug')({
  data() {
    const {subscribeType} = this.$route.meta.data

    if (subscribeType === -1) {
      return alert({
        tipText: '未查询到该订单',
        confirm: () => this.$router.go(-1)
      })
    }

    return {
      classes,
      index: 0,
      ...this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['memberUrlPrefix']),
    withImgReviews() {
      return this.reviews.filter(({reviewImgs}) => reviewImgs.length > 0)
    },
    filteredReviews() {
      return this.index ? this.withImgReviews : this.reviews
    },
    items() {
      return [`全部(${this.reviews.length})`, `有图(${this.withImgReviews.length})`]
    }
  },
  methods: {
    toggleTab(index) {
      this.index = index
    },
    goReview() {
      location.href = this.memberUrlPrefix + 'member-center/member-subscription/0/0'
    },
    toggleReview(reviewId) {
      this.$router.push(`/member-review/${reviewId}`)
    }
  },
  components: {
    HiTab,
    HiReview
  }
})

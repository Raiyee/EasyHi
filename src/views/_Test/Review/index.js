import HiReview from 'components/HiReview'

export default require('./index.pug')({
  name: 'review',
  data() {
    return {
      reviews: this.$route.meta.data
    }
  },
  components: {
    HiReview
  }
})

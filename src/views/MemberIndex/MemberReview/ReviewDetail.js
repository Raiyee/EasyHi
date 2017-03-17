import Review from 'components/HiReview/ReviewItem'

import classes from './review-detail.styl'

export default require('./review-detail.pug')({
  name: 'view-review',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  },
  components: {
    Review
  }
})

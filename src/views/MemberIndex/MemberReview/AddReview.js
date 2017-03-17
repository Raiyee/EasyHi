import {mapGetters} from 'vuex'

import {alert, toast, closeModal} from 'utils'

import HiRate from 'components/HiReview/HiRate'
import HiImage from 'components/HiImage'

import classes from './add-review.styl'

export default require('./add-review.pug')({
  name: 'add-review',
  data() {
    return {
      classes,
      reviewImgs: [],
      courseRate: 0,
      coachRate: 0,
      reviewContent: '',
      anonymous: false,
      ...this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['coachAlias', 'memberUrlPrefix'])
  },
  methods: {
    toggleCourseRate(rate) {
      this.courseRate = rate
    },
    toggleCoachRate(rate) {
      this.coachRate = rate
    },
    toggleAnonymous() {
      this.anonymous = !this.anonymous
    },
    async commitReview() {
      const {subscribeId, subscribeType, courseRate, coachRate, reviewContent, anonymous} = this
      if (((subscribeType - 1) === 0 && !courseRate) || !coachRate) {
        return alert('您还没打分呐')
      }

      await this.$http.post('/comment/add-comment', {
        subscribeId,
        courseRate,
        coachRate,
        reviewContent,
        anonymous,
        reviewImgs: this.$refs.images.imgs
      })

      toast({
        tipText: '谢谢您的评价，我们会做的更好~',
        close: () => {
          closeModal()
          location.replace(this.memberUrlPrefix + 'member-center/member-subscription/0/0')
        }
      })
    }
  },
  components: {
    HiRate,
    HiImage
  }
})

import {mapGetters} from 'vuex'

import HiTab from 'components/HiTab'
import HiReview from 'components/HiReview'
import HiRate from 'components/HiReview/HiRate'

import classes from './index.styl'

export default require('./index.pug')({
  data() {
    return {
      classes,
      index: this.$route.query.courseId ? 0 : 1,
      ...this.$route.meta.data
    }
  },
  computed: {
    ...mapGetters(['coachAlias']),
    items() {
      return ['课程详情', `${this.coachAlias}详情`]
    },
    showCourseContent() {
      const {courseProfile, courseEfficacy, actionFeature, applicableCrowd, courseTaboo} = this.course
      return courseProfile || courseEfficacy || actionFeature || applicableCrowd || courseTaboo
    },
    showCoachContent() {
      const {coachProfile, coachPrize, coachSpeciality, teachingExp} = this.coach
      return coachProfile || coachPrize || coachSpeciality || teachingExp
    },
    showReviews() {
      const {courseId} = this.$route.query
      return !courseId || !this.index
    },
    reviews() {
      const {coach, course, index} = this
      const {courseId} = this.$route.query
      return (index || !courseId) ? coach.coachReviews : course.courseReviews
    }
  },
  watch: {
    async '$route'() {
      Object.assign(this, {
        index: this.$route.query.courseId ? 0 : 1,
        ...(await this.$http.get('/member-subscribe/query-course-and-coach-detail', this.$route.query)).data})
    }
  },
  methods: {
    toggleTab(index) {
      this.index = index
    }
  },
  components: {
    HiTab,
    HiReview,
    HiRate
  }
})

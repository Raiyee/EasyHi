<template lang="pug" src="./review-item.pug"/>
<script>
  import {mapGetters} from 'vuex'

  import HiRate from './HiRate'
  import HiImage from '../HiImage'

  import {REQUIRED_OBJECT, toast} from 'utils'

  import {REVIEW} from 'flow/review'

  export default {
    props: {
      review: {
        ...REQUIRED_OBJECT,
        validator: (val: REVIEW) => true
      }
    },
    data() {
      return {
        scale: 12 / 14
      }
    },
    computed: {
      ...mapGetters(['coachAlias', 'memberUrlPrefix', 'isStaffS'])
    },
    methods: {
      gotoDetail() {
        const {courseId, coachId} = this.review
        this.$router.push({
          path: '/coach-course-detail',
          query: {
            coachId: coachId || null,
            courseId: courseId || null
          }
        })
      },
      replay() {
        const {review} = this
        this.$modal.open({
          id: 'replay-review',
          component: import('components/HiModal/ReplyModal'),
          options: {
            destroy: true,
            show: true
          },
          props: {
            placeholder: '请写下您对会员的回复',
            confirm: async reviewReply => {
              await this.$http.post('/comment/reply-review', {
                reviewId: review.reviewId,
                reviewReply
              })
              review.reviewReply = reviewReply
              this.$modal.close()
            }
          }
        })
      },
      async toggleVisibility() {
        const {review} = this
        const reviewVisible = !review.reviewVisible
        await this.$http.post('/comment/set-visible', {
          reviewId: review.reviewId,
          reviewVisible
        })
        review.reviewVisible = reviewVisible
        toast(`已${reviewVisible ? '置为' : '取消'}会员可见`)
      }
    },
    components: {
      HiRate,
      HiImage
    }
  }
</script>
<style lang="stylus" module src="./review-item.styl"/>

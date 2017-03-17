<template lang="pug">
  ul.list-unstyled(:class="[$style.content, {[$style.card]: cardStyle}]")
    template(v-for="review of reviews")
      li(:key="review.reviewId", @click="toggleReview(review.reviewId)")
        review-item(:review="review")
      li(v-if="!cardStyle", :class="$style.line")
        .split-line
</template>
<script>
  import ReviewItem from './ReviewItem'

  import {REQUIRED_ARRAY} from 'utils'

  export default {
    name: 'hi-review',
    props: {
      reviews: REQUIRED_ARRAY,
      cardStyle: Boolean
    },
    methods: {
      toggleReview(reviewId) {
        this.$emit('toggleReview', reviewId)
      }
    },
    components: {
      ReviewItem
    }
  }
</script>
<style lang="stylus" module>
  .content
    > li
      background-color $back-light-color
      padding 15px 10px

      &.line
        padding-top 0
        padding-bottom 0

    &.card > li
      margin-bottom 10px
      box-shadow $bottom-shadow
</style>

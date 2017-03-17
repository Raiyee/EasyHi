<template lang="pug" src="./index.pug"/>
<script>
  import HiRate from 'components/HiReview/HiRate'
  import HiReview from 'components/HiReview'

  import {mapGetters} from 'vuex'
  import {confirm, alert, toast} from 'utils'

  export default {
    name: 'merchant-course-detail',
    data() {
      return {
        scale: 12 / 14,
        show: false,
        close: true,
        ...this.$route.meta.data
      }
    },
    computed: {
      ...mapGetters(['merchantUrlPrefix']),
      cardRuleText() {
        const {applicableCardNum, deductPrice, deductTimes} = this.cardRule
        if (applicableCardNum === '0') return '共可用0张卡'

        const cardNumText = '共可用' + applicableCardNum + '张卡，至少扣'
        if (deductPrice && deductTimes) return cardNumText + deductTimes + '次或' + deductPrice + '元'
        if (!deductPrice) return cardNumText + deductTimes + '次'
        if (!deductTimes) return cardNumText + deductPrice + '元'
      },
      reviewNum() {
        return this.courseReviews.length
      },
      reviewVisibleNum() {
        return this.courseReviews.filter(({reviewVisible}) => reviewVisible).length
      }
    },
    methods: {
      showMaskContent() {
        this.show = !this.show
      },
      changeState() {
        this.close = !this.close
      },
      goEdit() {
        location.href = this.merchantUrlPrefix + 'merchant-course/edit/' + this.courseId
      },
      goCardRule() {
        location.href = this.merchantUrlPrefix + 'merchant-course/card-rule/' + this.courseId
      },
      async checkCourse(isCheck) {
        const sendUrl = isCheck ? '/merchant-course/check-course/' : '/merchant-course/delete/'
        const {data} = await this.$http.post(sendUrl + this.courseId)
        this.deleteCourse(data)
      },
      deleteCourse(data) {
        const {code, desc} = data
        switch (code) {
          case ALERT:
            return alert(desc)
          case CONFIRM:
            return confirm({
              tipText: desc,
              confirm: () => this.checkCourse(false)
            })
          default:
            toast({
              tipText: desc,
              close: () => {
                location.href = this.merchantUrlPrefix + 'merchant-course/course-list'
              }
            })
        }
      }
    },
    components: {
      HiRate,
      HiReview
    }
  }
</script>
<style lang="stylus" src="./index.styl" module/>

<template lang="pug">
  ul.list-unstyled(:class="$style.content")
    li.media(v-for="({activityName, activityImg, activityDescription, activityUrl}, index) of activities",
    :class="{['border-t']: index}",
    @click="$util.resolveRoute($router, activityUrl)")
      .media-left
        .media-object(v-lazy:background-image="activityImg")
      .media-body.media-middle
        h4.media-heading {{ activityName }}
        p {{ activityDescription }}
        div 创建次数: {{ creationTimes[index] }}次
</template>
<script>
  export default {
    data() {
      const {merchantUrlPrefix} = this.$store.getters
      return {
        creationTimes: this.$route.meta.data,
        activities: [{
          activityName: '邀请有礼',
          activityImg: require('../2-1.jpg'),
          activityDescription: '老会员推荐没动力？创建邀请有礼活动，奖励老会员，赠送新会员，双倍送礼，双倍办卡！',
          activityUrl: '/invitation-reward'
        }, {
          activityName: '报名活动',
          activityImg: require('../2-2.jpg'),
          activityDescription: '分享会？公益课？活动很多，但报名人数管理不过来怎么办？创建报名活动，轻松管理活动人数！',
          activityUrl: merchantUrlPrefix + 'experience/list'
        }, {
          activityName: '关注有礼',
          activityImg: require('../2-3.jpg'),
          activityDescription: '场馆粉丝不够多，潜在会员留不住？创建关注有礼活动，先关注后领券，粉丝转会员，相当有保障！',
          activityUrl: merchantUrlPrefix + 'expvoucher/list/3'
        }, {
          activityName: '限时抢卡',
          activityImg: require('../2-4.jpg'),
          activityDescription: '会员卡大促销，设置不同折扣进行限时限量促销，逢年过节冲销量，就他了！',
          activityUrl: merchantUrlPrefix + 'sellcard/list'
        }, {
          activityName: '储值卡满赠',
          activityImg: require('../2-5.jpg'),
          activityDescription: '储值卡如何做营销？设置不同赠送优惠，限时限量满额赠送，办卡率上涨没问题！',
          activityUrl: merchantUrlPrefix + 'storedvaluecard/list'
        }]
      }
    }
  }
</script>
<style lang="stylus" module>
  .content
    padding-left 10px
    margin-bottom 0

    :global
      .media
        padding-top 10px
        padding-bottom 10px
        margin-top 0

      .media-object
        width 110px
        height 135px

      .media-heading
        font-size $primary-size
        color $primary-color

      p
        height 60px

        &, + div
          scaleSize($smaller-size,,, left bottom)
          color $subtext-color
</style>

<template lang="pug">
  div(:class="$style.content")
    hi-scroll(:height="winHeight - 98 * rem")
      div(:class="$style.banner")
      template(v-for="(items, index) of itemsList")
        .panel(:class="$style.list")
          .panel-heading
            h5.panel-title
              span.iconfont(:class="`icon-${index ? 'gift' : 'props'}`")
              | {{ index ? '缤纷活动' : '道具推荐' }}
              div(v-if="index", :class="$style.more", @click="resolveRoute('/all-activities')") 全部
                span.iconfont.icon-arrow-right
          .panel-body.scroll-x
            ul.list-unstyled(:style="{width: items.length * 118 * rem + 'px'}")
              li(v-for="{itemImg, itemName, itemUrl, propId} of items", @click="resolveRoute(itemUrl, propId)")
                div(v-lazy:background-image="$util.imgPath(itemImg)")
                div {{ itemName }}
    ul.list-unstyled.fixed-bottom.border-t
      router-link(tag="li", to="/exp-voucher")
        span.iconfont.icon-exp-voucher-circle.theme-color
        div 体验券
      router-link(tag="li", to="/cash-voucher")
        span.iconfont.icon-cash-voucher-circle.theme-color
        div 现金券
      li(@click="resolveRoute(merchantUrlPrefix + 'cardmanage/card-list')")
        span.iconfont.icon-circle-card.theme-color
        div 会员卡
      li
        span.iconfont.icon-waiting
        div 敬请期待
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        props: this.$route.meta.data
      }
    },
    computed: {
      ...mapGetters(['merchantUrlPrefix', 'rem', 'winHeight']),
      itemsList() {
        const {merchantUrlPrefix} = this
        return [[{
          itemName: '体式挑战赛',
          itemImg: require('./1-1.jpg'),
          itemUrl: merchantUrlPrefix + 'asana/activity-home'
        }, {
          itemName: '塔罗牌',
          itemImg: require('./1-2.jpg'),
          itemUrl: merchantUrlPrefix + 'expvoucher/list/1'
        }].concat(this.props.length ? this.props.map(({propId, propName, propImg}) => ({
          itemName: propName,
          itemImg: propImg,
          propId: propId
        })) : [{
          itemName: '敬请期待',
          itemImg: require('./waiting.jpg')
        }]), [{
          itemName: '邀请有礼',
          itemImg: require('./2-1.jpg'),
          itemUrl: '/invitation-reward'
        }, {
          itemName: '报名活动',
          itemImg: require('./2-2.jpg'),
          itemUrl: merchantUrlPrefix + 'experience/list'
        }, {
          itemName: '关注有礼',
          itemImg: require('./2-3.jpg'),
          itemUrl: merchantUrlPrefix + 'expvoucher/list/3'
        }, {
          itemName: '限时抢卡',
          itemImg: require('./2-4.jpg'),
          itemUrl: merchantUrlPrefix + 'sellcard/list'
        }, {
          itemName: '储值卡满赠',
          itemImg: require('./2-5.jpg'),
          itemUrl: merchantUrlPrefix + 'storedvaluecard/list'
        }]]
      }
    },
    methods: {
      async resolveRoute(url, propId) {
        this.$util.resolveRoute(this.$router, url || (await this.$http.post(`/isst/getTreasPageUrl/${propId}`)).data)
      }
    }
  }
</script>
<style lang="stylus" module>
  .content
    ul
      display flex
      margin-bottom 0

      li
        flex 1
        text-align center

    :global
      .panel
        margin-bottom 5px

      .panel-heading
        padding 15px 10px

      .panel-title
        color $primary-color
        font-weight normal

        .iconfont
          font-size $primary-size
          transform none
          margin-right 2px

      .panel-body
        padding 0 10px

      .fixed-bottom
        padding 10px

        li
          color $primary-color

          span
            display block
            font-size 40px

  .banner
    height 150px
    retina('./banner')
    margin-bottom 5px

  .more
    scaleSize($smaller-size,,, right)
    float right
    color $remark-color

    span
      transform none

  .list
    li
      margin-right 8px

      > div
        &:first-child
          height 135px
          background-position center
        &:last-child
          padding 10px 0
</style>

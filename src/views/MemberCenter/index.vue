<template>
  <div :class="$style.container">
    <div class="media theme-bg" :class="$style.header">
      <div class="media-left">
        <div class="media-object media-middle">
          <img class="img-circle" :src="'60/60?random' | imgPath"/>
        </div>
      </div>
      <div class="media-body media-middle">
        <div class="media-heading">{{ memberName }}</div>
        <div class="media-body">{{ memberMobile }}</div>
      </div>
      <div class="media-right" @click="memberMessage">
            <span class="glyphicon glyphicon-unchecked">
              <span class="text-center">{{ messageCount > 9 ? '9+' : messageCount }}</span>
            </span>
      </div>
    </div>
    <div class="panel panel-full" :class="$style.subscribePanel">
      <div class="panel-heading">
        <h3 class="panel-title">
          最近课程
          <small v-if="latestCourse">（ {{ courseDate }} ）</small>
          <a class="pull-right" href="#member-center/member-subscription">
            查看全部预订
            <span class="iconfont icon-arrow-right"></span>
          </a>
        </h3>
      </div>
      <div class="clearfix panel-body">
        <template v-if="latestCourse">
          <span class="glyphicon glyphicon-time theme-color"></span>
          <div>
            {{ courseDuration }} {{ courseName }}
            <br>
            预订<span class="theme-color" :class="$style.count">{{ courseCost }}</span>人
            <br>
            <template v-for="courseBill in courseBills">
              扣{{ courseBill.name }}<span class="theme-color" :class="$style.count">{{ courseBill.count }}</span>次
            </template>
          </div>
        </template>
        <template v-else>
          <div class="text-center" :class="$style.noCourse">
            <div>还没有要上的课</div>
            <button class="btn btn-theme-primary">去订课</button>
          </div>
        </template>
      </div>
      <div v-if="latestCourse" id="cancel-subscribe" class="panel-footer theme-color text-right"
           :subscribeId="subscribeId">取消预订
      </div>
    </div>
    <div class="panel panel-full" :class="$style.cardPanel">
      <div class="panel-heading">
        <h3 class="panel-title">我的卡券</h3>
      </div>
      <div class="panel-body text-center clearfix">
        <div class="enabled" data-link="#member-center/member-card">
          <span class="glyphicon glyphicon-credit-card theme-color"></span>
          <br/>
          会员卡( {{ cardNum }} )
        </div>
        <div class="enabled" data-link="#member-center/expvoucher-link/1">
          <span class="glyphicon glyphicon-credit-card theme-color"></span>
          <br/>
          体验券:( {{ voucherNum }} )
        </div>
      </div>
    </div>
    <div v-if="grantList && grantList.length > 0" class="panel panel-full" :class="$style.kfPanel">
      <div class="panel-heading">
        <h3 class="panel-title">授权信息</h3>
      </div>
      <div v-for="grant in grantList" class="panel-body text-center clearfix">
        <div class="media theme-color" :class="$style.header">
          <div class="media-left only-kf">
            <div class="media-object media-middle">
              <img class="img-circle"
                   src="http://www.66tools.com/WebTools/rImage?p=400">
            </div>
          </div>
          <div class="media-body media-middle only-kf">
            <div class="media-heading">
              {{ grant.sourceName }}
            </div>
            <div class="media-body">
              {{ grant.sourceMobile }}
            </div>
          </div>
          <div :class="['media-right', 'only-kf', grant.selected=='0'? 'accept-oauth' : 'release-oauth']">
            <span class="">{{ grant.selected == '0' ? '开启授权' : '解除授权' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-full" :class="$style.contactPanel">
      <div class="panel-body text-center">
        <template v-if="hasNotice">
          <a :class="$style.memberNotice">
            <div>会员须知></div>
          </a>
          <hr/>
        </template>
        <a :href="'tel:'+ ownerMobile">
          <div>
            联系客服 {{ ownerMobile }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'memberCenterIndex',
    data() {
      return this.$route.meta.data
    },
    methods: {
      memberMessage: function () {
        this.$router.push('/member-message')
      }
    }
  }
</script>
<style src="./index.styl" module/>

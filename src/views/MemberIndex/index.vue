<template>
  <div :class="$style.content" :style="{height: winHeight + 'px'}">
    <div :class="[$style.pic, $style.pic1]"></div>
    <div :class="[$style.pic, $style.pic2]"></div>
    <div :class="$style.slogan">
      <div :class="$style.sloganHeader">
        <input :class="$style['slogan-title']" title="请输入标题" value="遇见瑜伽" readonly/>
        <div :class="$style.line"></div>
      </div>
      <div class="center-block" :class="$style['slogan-body']">
        <textarea :class="$style['slogan-text']" title="请输入内容" readonly>当心得到控制，平静下来时，剩下的便是灵魂</textarea>
      </div>
    </div>
    <div :class="$style.memberMenu">
      <div class="pull-left animated" :class="$style.outsideCircle" @animationend="animationEnd">
        <router-link to="/member-subscribe"
                     tag="div"
                     :class="$style.insideCircle">
          <span class="glyphicon glyphicon-book" :class="$style.menuIcon"/>
          <span :class="$style.menuText">预订课程</span>
        </router-link>
        <div :class="$style.insideCircleReplace"></div>
      </div>
      <div class="pull-right animated" :class="$style.outsideCircle" @animationend="animationEnd">
        <router-link to="/member-center"
                     tag="div"
                     :class="$style.insideCircle">
          <span class="glyphicon glyphicon-user" :class="$style.menuIcon"/>
          <span :class="$style.menuText">个人中心</span>
        </router-link>
        <div :class="$style.insideCircleReplace"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  import {addClass, removeClass} from 'utils'

  export default {
    name: 'member-index',
    computed: {
      ...mapGetters(['winHeight'])
    },
    methods: {
      animationEnd(e) {
        removeClass(e.target, 'animated')
      }
    }
  }
</script>
<style src="./index.styl" module/>

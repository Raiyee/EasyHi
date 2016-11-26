<template>
  <div :class="$style.content" :style="{height: winHeight + 'px'}">
    <div class="pic" :class="$style.pic1"></div>
    <div class="pic" :class="$style.pic2"></div>
    <div class="slogan">
      <div class="slogan-header">
        <input :class="$style['slogan-title']" title="请输入标题" value="遇见瑜伽" readonly/>
        <div :class="$style.line"></div>
      </div>
      <div class="center-block" :class="$style['slogan-body']">
        <textarea :class="$style['slogan-text']" title="请输入内容" readonly>当心得到控制，平静下来时，剩下的便是灵魂</textarea>
      </div>
    </div>
    <div class="member-menu">
      <div class="pull-left animated" :class="$style.outsideCircle" @animationend="animationEnd">
        <router-link to="/member-subscribe"
                     tag="div"
                     class="inside-circle">
          <span class="glyphicon glyphicon-book menu-icon"/>
          <span class="menu-text">预订课程</span>
        </router-link>
        <div :class="$style.insideCircleReplace"></div>
      </div>
      <div class="pull-right animated" :class="$style.outsideCircle" @animationend="animationEnd">
        <router-link to="/member-center"
                     tag="div"
                     class="inside-circle">
          <span class="glyphicon glyphicon-user menu-icon"/>
          <span class="menu-text">个人中心</span>
        </router-link>
        <div :class="$style.insideCircleReplace"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default from './index.common'
</script>
<style src="./index.styl" module/>

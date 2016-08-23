<template>
  <div class="container" :style="{height: height + 'px'}">
    <div class="pic pic1"></div>
    <div class="pic pic2"></div>
    <div class="slogan">
      <div class="slogan-header">
        <input class="slogan-title" title="请输入标题" value="遇见瑜伽" readonly/>
        <div class="line"></div>
      </div>
      <div class="center-block slogan-body">
        <textarea class="slogan-text" title="请输入内容" readonly>当心得到控制，平静下来时，剩下的便是灵魂</textarea>
      </div>
    </div>
    <div class="member-menu">
      <div class="pull-left animated outside-circle" @animationend="animationEnd">
        <router-link :to="{name: 'memberSubscribe'}"
                     tag="div"
                     class="inside-circle">
          <span class="glyphicon glyphicon-book menu-icon"/>
          <span class="menu-text">预订课程</span>
        </router-link>
        <div class="inside-circle-replace"></div>
      </div>
      <div class="pull-right animated outside-circle" @animationend="animationEnd">
        <router-link :to="{name: 'memberCenter'}"
                     tag="div"
                     class="inside-circle">
          <span class="glyphicon glyphicon-user menu-icon"/>
          <span class="menu-text">个人中心</span>
        </router-link>
        <div class="inside-circle-replace"></div>
      </div>
    </div>
  </div>
</template>
<script>
  // eslint-disable-next-line object-curly-spacing
  export default from './index.common';
</script>
<style lang="stylus" src="./index.styl" scoped/>

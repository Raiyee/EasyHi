<template>
  <div class="content">
    <div class="wrap over-hidden" :style="{height:height+'px'}">
      <div class="pic pic1"></div>
      <div class="pic pic2"></div>
      <div class="slogan">
        <div class="over-hidden slogan-header">
          <input class="slogan-title" title="请输入标题" value="遇见瑜伽" disabled>
          <div class="line"></div>
        </div>
        <div class="over-hidden slogan-body center-block">
          <textarea class="slogan-text" title="请输入内容" disabled>当心得到控制，平静下来时，剩下的便是灵魂</textarea>
        </div>
      </div>
      <div class="member-menu">
        <div class="pull-left outside-circle" @animationend="animationend">
          <div class="inside-circle" data-title="subscribe"
               @click="goto">
            <span class="glyphicon glyphicon-book menu-icon"/>
            <span class="menu-text">预订课程</span>
          </div>
          <div class="inside-circle-replace" @animationend="animationend"></div>
        </div>
        <div class="pull-right outside-circle" @animationend="animationend">
          <div class="inside-circle" data-title="index"
               @click="goto">
            <span class="glyphicon glyphicon-user menu-icon"/>
            <span class="menu-text">个人中心</span>
          </div>
          <div class="inside-circle-replace" @animationend="animationend"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'app',
    computed: {
      ...mapGetters(['height'])
    },
    methods: {
      animationend: function (e) {
        const target = e.target;
        target.style.opacity = 1;
        target.className = target.className.replace(/ *animated */, '');
      },
      goto: function (e) {
        let target = e.target;
        if (!target.className.match(/inside-circle/)) {
          target = target.parentElement;
        }
        target = target.nextElementSibling;
        target.className.match(/(^| )animated($| )/) || (target.className += ' animated');
      }
    }
  };
</script>
<style lang="less" src="./index.less"/>

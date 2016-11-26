<template>
  <div class="container">
    tap: {{ tapNum }},<br>
    dblTap: {{ dblTapNum }},<br>
    mltTap: {{ mltTapNum }}, lastMltTapped: {{ lastMltTapped }}<br>
    press: {{ pressNum }},<br>
    swipeLeft: {{ swipeLeftNum }},<br>
    swipeRight: {{ swipeRightNum }},<br>
    swipeUp: {{ swipeUpNum }},<br>
    swipeDown: {{ swipeDownNum }}
    <br>
    <div v-move="touch" @dblclick="dblclickOuter">
      <button class="btn btn-primary" :class="$style.btn" @tap="click">{{ msg }}</button>
      <div @dblclick="dblclick">
        <button class="btn btn-primary" :class="$style.btn">Just Another Button</button>
      </div>
    </div>
    <br>
    <br>
    <button class="btn btn-default" @click="toggle('x')">toggle x ({{ x }})</button>
    <button class="btn btn-default" @click="toggle('y')">toggle y ({{ y }})</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: 'try to touch, move, swipe, press me!',
        x: false,
        y: false,
        tapNum: 0,
        dblTapNum: 0,
        mltTapNum: 0,
        lastMltTapped: 0,
        pressNum: 0,
        swipeLeftNum: 0,
        swipeRightNum: 0,
        swipeUpNum: 0,
        swipeDownNum: 0
      }
    },
    computed: {
      touch() {
        return {
          x: this.x,
          y: this.y,
          methods: true
        }
      }
    },
    methods: {
      toggle(prop) {
        this[prop] = !this[prop]
      },
      tap(e) {
        this.tapNum++
      },
      dblTap() {
        this.dblTapNum++
      },
      mltTap({tapped}) {
        this.mltTapNum++
        this.lastMltTapped = tapped
      },
      press() {
        this.pressNum++
      },
      swipeLeft() {
        this.swipeLeftNum++
      },
      swipeRight() {
        this.swipeRightNum++
      },
      swipeUp() {
        this.swipeUpNum++
      },
      swipeDown() {
        this.swipeDownNum++
      },
      click() {
        console.log('clicked the first button')
      },
      dblclick() {
        console.log('dblclicked the second one')
      },
      dblclickOuter() {
        console.log('dblclicked')
      }
    }
  }
</script>
<style src="./index.styl" module/>

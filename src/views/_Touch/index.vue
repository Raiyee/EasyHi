<template lang="html">
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
    <div v-touch="{methods: true}" @dblclick="dblclickOuter">
      <button class="btn btn-primary" :class="$style.btn" @tap="click">{{ msg }}</button>
      <div @dblclick="dblclick">
        <button class="btn btn-primary" :class="$style.btn">Just Another Button</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: 'try to touch, move, swipe, press me!',
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

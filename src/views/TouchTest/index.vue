<template>
  <div class="container">
    tap: {{ tap }},<br>
    dbTap: {{ dbTap }},<br>
    press: {{ press }},<br>
    swipeLeft: {{ swipeLeft }},<br>
    swipeRight: {{ swipeRight }},<br>
    swipeUp: {{ swipeUp }},<br>
    swipeDown: {{ swipeDown }}
    <br>
    <button class="btn btn-primary" :class="$style.btn" v-touch="touch">
      {{ msg }}
    </button>
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
        tap: 0,
        dbTap: 0,
        press: 0,
        swipeLeft: 0,
        swipeRight: 0,
        swipeUp: 0,
        swipeDown: 0
      }
    },
    computed: {
      touch() {
        return {
          x: this.x,
          y: this.y,
          tap: () => {
            this.tap++
          },
          dbTap: () => {
            this.dbTap++
          },
          press: () => {
            this.press++
          },
          swipeLeft: () => {
            this.swipeLeft++
          },
          swipeRight: () => {
            this.swipeRight++
          },
          swipeUp: () => {
            this.swipeUp++
          },
          swipeDown: () => {
            this.swipeDown++
          }
        }
      }
    },
    methods: {
      toggle(prop) {
        this[prop] = !this[prop]
      }
    }
  }
</script>
<style src="./index.styl" lang="styl" module/>

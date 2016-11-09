<template>
  <div>
    <br>
    <button class="btn btn-primary" :class="$style.btn" v-touch="touchOptions">
      {{ msg }}, {{ x + y }}
    </button>
    <span>{{ x }}, {{ y }}</span>
    <br>
    <br>
    <button class="btn btn-default" @click="add('x')">add x</button>
    <button class="btn btn-default" @click="add('y')">add y</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: 'try to move me!',
        x: 0,
        y: 0
      }
    },
    computed: {
      touchOptions() {
        return {
          x: false,
          y: false,
          handler: {
            tap() {
              console.log('tap')
            },
            dbTap() {
              console.log('dbTap')
            },
            press() {
              console.log('press')
            },
            swipeLeft() {
              console.log('swipeLeft')
            },
            swipeRight() {
              console.log('swipeRight')
            },
            swipeUp() {
              console.log('swipeUp')
            },
            swipeDown() {
              console.log('swipeDown')
            }
          }
        }
      }
    },
    methods: {
      add(prop) {
        this[prop]++
      }
    }
  }
</script>
<style src="./index.styl" lang="styl" module/>

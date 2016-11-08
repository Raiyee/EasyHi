<template>
  <div>
    <br>
    <button class="btn btn-primary" v-touch="touchOptions">
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
            start: this.start,
            moving: this.moving
          }
        }
      }
    },
    methods: {
      add(prop) {
        this[prop]++
      },
      start() {
        console.log('start')
      },
      moving() {
        console.log('moving')
      }
    }
  }
</script>
<style src="./index.styl" lang="styl" module/>

<template>
  <div>
    <br>
    <button class="btn btn-primary" v-move="{x: false, y: true, start: start}">
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
    methods: {
      add(prop) {
        this[prop]++
      },
      start() {
        console.log('start')
      }
    }
  }
</script>
<style src="./index.styl" lang="styl" module/>

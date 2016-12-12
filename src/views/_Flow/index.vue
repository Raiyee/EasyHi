<template lang="html">
  <div>
    {{ num }} / {{ boo }} <br>
    {{ msg }}
    <input type="text" :value="msg" @input="onInput" ref="msg">
  </div>
</template>
<script>
  const add = (num1: number, num2: number): number => num1 + num2
  const native = (boo: boolean): boolean => !boo
  export default {
    data() {
      return {
        num: (add(3, 2): number),
        boo: (native(false): boolean),
        msg: 2
      }
    },
    methods: {
      onInput() {
        this.msg = (+this.$refs.msg.value: number)
      }
    }
  }
</script>

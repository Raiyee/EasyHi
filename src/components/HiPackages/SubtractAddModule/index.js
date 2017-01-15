import classes from './index.styl'

import {REQUIRED_NUMBER} from 'utils'

export default require('./index.pug')({
  data() {
    return {
      classes,
      currIns: this.curr
    }
  },
  props: {
    min: REQUIRED_NUMBER,
    max: REQUIRED_NUMBER,
    step: REQUIRED_NUMBER,
    curr: REQUIRED_NUMBER
  },
  methods: {
    clickEvent(step) {
      this.currIns += step * this.step
      this.$emit('clickEvent', this.currIns)
    }
  },
  computed: {
    canAdd: function () {
      return (this.currIns + this.step) < this.max
    },
    canSubtract: function () {
      return (this.currIns - this.step) > this.min
    }
  }
})

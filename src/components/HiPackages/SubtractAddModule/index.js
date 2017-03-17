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
    min: {
      REQUIRED_NUMBER,
      default: 1
    },
    max: {
      REQUIRED_NUMBER,
      default: Number.MAX_SAFE_INTEGER
    },
    step: {
      REQUIRED_NUMBER,
      default: 1
    },
    curr: {
      REQUIRED_NUMBER,
      default: 1
    },
    isForbidden: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickEvent(step) {
      this.$emit('clickEvent', this.isForbidden ? this.currIns : this.currIns += step * this.step, step)
    }
  },
  watch: {
    curr(val) {
      this.currIns = val
    }
  },
  computed: {
    canAdd: function () {
      return (this.currIns + this.step) <= this.max
    },
    canSubtract: function () {
      return (this.currIns - this.step) >= this.min
    }
  }
})

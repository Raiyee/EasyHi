import {mapGetters} from 'vuex'

import classes from './coach-item.styl'

import {REQUIRED_OBJECT} from 'utils'

export default require('./coach-item.pug')({
  props: {
    activeCoachId: String,
    coachItem: REQUIRED_OBJECT
  },
  data() {
    return {
      classes,
      checked: false,
      activeTime: null
    }
  },
  computed: {
    ...mapGetters(['rem']),
    hasItems() {
      for (const value of Object.values(this.activeItems)) {
        if (value.length) return true
      }
    },
    active() {
      return this.coachItem.coachId === this.activeCoachId
    },
    activeItems() {
      return this.coachItem[`min${this.checked ? '120' : '060'}`]
    },
    height() {
      const rem = this.rem

      if (!this.hasItems) return 90 * rem

      let height = 20 + 15 + 36 + 25
      for (const value of Object.values(this.activeItems)) {
        height += value.length && (Math.ceil(value.length / 4) * 65 + 10)
      }
      return height * rem
    },
    style() {
      return this.active && {
        height: `${this.height}px`
      }
    }
  },
  methods: {
    toggleActive() {
      this.$emit('toggleActiveCoach', this.active ? null : this.coachItem.coachId)
    },
    toggleChecked(checked) {
      this.checked = checked
    },
    toggleTime(time) {
      this.activeTime = time === this.activeTime ? null : time
    },
    orderSchedule(e) {
    }
  }
})

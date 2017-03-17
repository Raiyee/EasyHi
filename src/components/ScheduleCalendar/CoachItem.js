import {mapGetters} from 'vuex'

import classes from './coach-item.styl'

import {REQUIRED_OBJECT} from 'utils'

export default require('./coach-item.pug')({
  name: 'coach-item',
  props: {
    activeCoachId: String,
    coachItem: REQUIRED_OBJECT
  },
  data() {
    return {
      classes,
      activeTime: null,
      activeIndex: 0
    }
  },
  computed: {
    ...mapGetters(['memberUrlPrefix', 'rem', 'style']),
    hasItems() {
      for (const value of Object.values(this.activeItems)) {
        if (value.length) return true
      }
    },
    active() {
      return this.coachItem.coachId === this.activeCoachId
    },
    activeTimes() {
      return this.coachItem.times[this.activeIndex]
    },
    activeMinute() {
      return this.activeTimes.minute
    },
    activeItems() {
      return this.activeTimes.data
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
    itemStyle() {
      return this.active && {
        height: `${this.height}px`
      }
    }
  },
  methods: {
    toggleActive() {
      this.$emit('toggleActiveCoach', this.active ? null : this.coachItem.coachId)
    },
    subscribePrivate() {
      this.activeTime && this.$emit('subscribePrivate', this.activeMinute, this.activeTime)
    },
    gotoDetail() {
      this.$router.push({path: '/coach-course-detail', query: {coachId: this.coachItem.coachId}})
    }
  }
})

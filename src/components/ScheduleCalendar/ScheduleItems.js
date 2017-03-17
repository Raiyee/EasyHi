import {mapGetters} from 'vuex'

import ScheduleItem from './ScheduleItem'

import {REQUIRED_ARRAY, REQUIRED_BOOLEAN, REQUIRED_NUMBER, REQUIRED_STRING} from 'utils'

export default require('./schedule-items.pug')({
  name: 'schedule-items',
  props: {
    date: REQUIRED_STRING,
    itemsHeight: REQUIRED_NUMBER,
    last: REQUIRED_BOOLEAN,
    scheduleItems: REQUIRED_ARRAY
  },
  computed: {
    ...mapGetters(['rem']),
    itemsStyle() {
      if (!this.last) return
      const itemsLength = this.scheduleItems.length
      return {
        marginBottom: `${this.itemsHeight - (28 + 113 * itemsLength) *
        Math.floor(this.rem * 10) / 10 - itemsLength + 10}px`
      }
    }
  },
  methods: {
    activeSchedule(scheduleId, remainingNum) {
      this.$emit('activeSchedule', scheduleId, remainingNum)
    }
  },
  components: {
    ScheduleItem
  }
})

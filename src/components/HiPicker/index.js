import PickerSlot from './picker-slot'

import '!style-loader!css-loader!stylus-loader!./index.styl'

export default require('./index.pug')({
  name: 'mt-picker',
  props: {
    slots: {
      type: Array
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    valueKey: String,
    rotateEffect: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$on('slotValueChange', this.slotValueChange)
    const slots = this.slots || []
    this.values = []
    const values = this.values
    let valueIndexCount = 0
    slots.forEach(function (slot) {
      if (!slot.divider) {
        slot.valueIndex = valueIndexCount++
        values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0]
      }
    })
  },
  methods: {
    slotValueChange() {
      this.$emit('change', this, this.values)
    },
    getSlot(slotIndex) {
      const slots = this.slots || []
      let count = 0
      let target
      const children = this.$children.filter(child => child.$options.name === 'picker-slot')
      slots.forEach(function (slot, index) {
        if (!slot.divider) {
          if (slotIndex === count) {
            target = children[index]
          }
          count++
        }
      })
      return target
    },
    getSlotValue(index) {
      const slot = this.getSlot(index)
      if (slot) {
        return slot.value
      }
      return null
    },
    setSlotValue(index, value) {
      const slot = this.getSlot(index)
      if (slot) {
        slot.currentValue = value
      }
    },
    getSlotValues(index) {
      const slot = this.getSlot(index)
      if (slot) {
        return slot.mutatingValues
      }
      return null
    },
    setSlotValues(index, values) {
      const slot = this.getSlot(index)
      if (slot) {
        slot.mutatingValues = values
      }
    },
    getValues() {
      return this.values
    },
    setValues(values) {
      const slotCount = this.slotCount
      values = values || []
      if (slotCount !== values.length) {
        throw new Error('values length is not equal slot count.')
      }
      values.forEach((value, index) => {
        this.setSlotValue(index, value)
      })
    }
  },
  computed: {
    values() {
      const slots = this.slots || []
      const values = []
      slots.forEach(function (slot) {
        if (!slot.divider) values.push(slot.value)
      })
      return values
    },
    slotCount() {
      const slots = this.slots || []
      let result = 0
      slots.forEach(function (slot) {
        if (!slot.divider) result++
      })
      return result
    }
  },
  components: {
    PickerSlot
  }
})

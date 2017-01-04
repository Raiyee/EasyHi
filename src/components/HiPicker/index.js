import PickerList from './PickerList'

import {isArray, isObject, isOdd, error} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  props: {
    pickers: {
      type: [Array, Object],
      default: []
    },
    visibleCount: {
      type: Number,
      default: 5,
      validator: val => isOdd(val) || error('visibleCount should be an odd number')
    }
  },
  data: () => ({classes}),
  computed: {
    pickerList() {
      const pickerList = isArray(this.pickers) ? [...this.pickers] : [this.pickers]

      pickerList.forEach((picker, index) => {
        if (picker.divider) return
        const valueKey = picker.valueKey || 'key'
        const valueText = picker.valueText || 'text'
        pickerList[index] = {
          ...pickerList[index],
          valueKey,
          valueText,
          values: picker.values.map((value, index) => isObject(value) ? {...value} : {
            [valueKey]: index,
            [valueText]: value
          })
        }
      })

      return pickerList
    }
  },
  watch: {
    pickers: {
      deep: true
    }
  },
  methods: {
    itemChanged() {
      this.$emit('itemChanged', ...arguments)
    }
  },
  components: {
    PickerList
  }
})

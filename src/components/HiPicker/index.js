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
    hasTitle() {
      return !!this.pickers.find(picker => picker.title)
    },
    pickerList() {
      const pickerList = isArray(this.pickers) ? [...this.pickers] : [this.pickers]

      const isDouble = pickerList.filter(picker => !picker.divider).length === 2

      pickerList.forEach((picker, index) => {
        if (picker.divider) return
        const valueKey = picker.valueKey || 'key'
        const valueText = picker.valueText || 'text'

        pickerList[index] = {
          ...picker,
          valueKey,
          valueText,
          textAlign: picker.textAlign || isDouble && (index ? 'left' : 'right'),
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

import PickerList from './PickerList'

import {isArray, isObject, isOdd, error} from 'utils'

import classes from './index.styl'

export default require('./index.pug')({
  props: {
    pickers: {
      type: [Array, Object],
      default: () => []
    },
    pickerDivider: {
      type: Boolean,
      default: true
    },
    pickerTitle: String,
    visibleCount: {
      type: Number,
      default: 5,
      validator: val => isOdd(val) || error('visibleCount should be an odd number')
    }
  },
  data() {
    const pickerList = isArray(this.pickers) ? [...this.pickers] : [this.pickers]

    const length = pickerList.length

    const isDouble = length === 2

    pickerList.forEach((picker, index) => {
      const valueKey = picker.valueKey || 'key'
      const valueText = picker.valueText || 'value'

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

    return {
      classes,
      pickerList,
      result: pickerList.map(picker => {
        const currIndex = picker.defaultIndex || 0
        const value = picker.values[currIndex]
        return [value[picker.valueKey], value[picker.valueText]]
      })
    }
  },
  computed: {
    hasTitle() {
      return !!(this.pickerTitle || this.pickers.find(picker => picker.title))
    }
  },
  watch: {
    pickers: {
      deep: true
    }
  },
  methods: {
    itemChanged(index, valueKey, valueText) {
      this.result[index] = [valueKey, valueText]
      this.$emit('itemChanged', ...arguments)
    }
  },
  components: {
    PickerList
  }
})

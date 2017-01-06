import {mapGetters} from 'vuex'

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
      const valueKey = picker.valueKey || 'value'
      const textKey = picker.textKey || 'text'

      pickerList[index] = {
        ...picker,
        valueKey,
        textKey,
        textAlign: picker.textAlign || isDouble && (index ? 'left' : 'right'),
        values: picker.values.map((value, index) => isObject(value) ? {...value} : {
          [valueKey]: index,
          [textKey]: value
        })
      }
    })

    return {
      classes,
      pickerList,
      result: pickerList.map(picker => {
        const currIndex = picker.defaultIndex || 0
        const value = picker.values[currIndex]
        return [value[picker.valueKey], value[picker.textKey]]
      })
    }
  },
  computed: {
    ...mapGetters(['appWidth', 'rem']),
    hasTitle() {
      return !!(this.pickerTitle || this.pickers.find(picker => picker.title))
    },
    maxWidth() {
      const placeholderWith = 30 * this.rem
      const baseWidth = this.appWidth - placeholderWith
      const length = this.pickerList.length
      const offset = this.pickerDivider && placeholderWith * (length - 1)
      return (baseWidth - offset) / length + 'px'
    }
  },
  watch: {
    pickers: {
      deep: true
    }
  },
  methods: {
    itemChanged(index, value, text) {
      this.result[index] = [value, text]
      this.$emit('itemChanged', ...arguments)
    }
  },
  components: {
    PickerList
  }
})

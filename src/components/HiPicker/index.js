import {mapGetters} from 'vuex'

import PickerList from './PickerList'

import {isObject, isOdd, error, REQUIRED_ARRAY} from 'utils'

import classes from './index.styl'

const generatePicker = (pickers, index) => {
  const picker = pickers[index]

  const valueKey = picker.valueKey || 'value'
  const textKey = picker.textKey || 'text'

  return {
    ...picker,
    valueKey,
    textKey,
    textAlign: picker.textAlign || pickers.length === 2 && (index ? 'left' : 'right') || 'center',
    values: picker.values.map((value, index) => isObject(value) ? value : {
      [valueKey]: index,
      [textKey]: value
    })
  }
}

export default require('./index.pug')({
  name: 'hi-picker',
  props: {
    pickers: REQUIRED_ARRAY,
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
    const pickerList = []
    this.pickers.forEach((picker, index) => pickerList.push(generatePicker(this.pickers, index)))
    return {
      classes,
      changingIndex: null,
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
      return this.pickerTitle || this.pickers.find(picker => picker.title)
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
    pickers(pickers) {
      if (this.changingIndex == null) return
      const index = this.changingIndex + 1
      this.$set(this.pickerList, index, generatePicker(pickers, index))
    }
  },
  methods: {
    itemChanged(index, value, text) {
      this.changingIndex = index;
      (this.result = [...this.result])[index] = [value, text]
      this.$emit('itemChanged', ...arguments)
    }
  },
  components: {
    PickerList
  }
})

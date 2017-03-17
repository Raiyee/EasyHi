import {mapGetters} from 'vuex'

import PickerList from './PickerList'

import {isObject, isOdd, error, REQUIRED_ARRAY} from 'utils'

import classes from './index.styl'

const refError = text => {
  throw new ReferenceError(`should not modify ${text} directly`)
}

export default require('./index.pug')({
  name: 'hi-picker',
  props: {
    pickers: {
      ...REQUIRED_ARRAY,
      validator: pickers => {
        if (!pickers.length) return false
        return pickers.every(picker => {
          const values = picker.values
          if (!values || !values.length) return false
          const object = isObject(values[0])
          return values.every(value => isObject(value) === object)
        })
      }
    },
    pickerDivider: {
      type: Boolean,
      default: true
    },
    pickerMask: Boolean,
    pickerTitle: String,
    visibleCount: {
      type: Number,
      default: 5,
      validator: val => isOdd(val) || error('visibleCount should be an odd number')
    }
  },
  data() {
    const pickerLists = [...this.pickers]

    return {
      classes,
      pickerLists,
      resulting: pickerLists.map(picker => {
        const index = picker.defaultIndex || 0
        const value = picker.values[index]
        const object = isObject(value)
        return [object ? value[picker.valueKey || 'value'] : index, object ? value[picker.textKey || 'text'] : value]
      })
    }
  },
  computed: {
    ...mapGetters(['appWidth', 'rem']),
    hasTitle() {
      return this.pickerTitle || this.pickerLists.find(picker => picker.title)
    },
    maxWidth() {
      const placeholderWith = 30 * this.rem
      const baseWidth = this.appWidth - placeholderWith
      const length = this.pickerLists.length
      const offset = this.pickerDivider && placeholderWith * (length - 1)
      return (baseWidth - offset) / length + 'px'
    },
    result: {
      get() {
        return [...this.resulting]
      },
      set() {
        refError('result')
      }
    }
  },
  watch: {
    resulting(curr, prev) {
      curr === prev || refError('resulting')
    }
  },
  methods: {
    itemChanged(index, value, text) {
      this.$set(this.resulting, index, [value, text])
      this.$emit('itemChanged', ...arguments)
    }
  },
  components: {
    PickerList
  }
})

import classes from './index.styl'

import {emptyArr, jsonClone, REQUIRED_ARRAY} from 'utils'

const filterBracket = str => str.replace(/([^(]*)(\(.*\))/gi, (val, $1) => $1)

export default require('./index.pug')({
  filters: {
    filterBracket
  },
  name: 'hi-dropdown',
  props: {
    selections: Array,
    selected: {
      ...REQUIRED_ARRAY,
      validate: value => value.length
    },
    getSelections: Function
  },
  data() {
    return {
      classes,
      content: '',
      active: false,
      determineCodes: jsonClone(this.selected) || emptyArr(this.selections.length),
      cacheSelected: this.selected || emptyArr(this.selections.length),
      activeIndex: null
    }
  },
  computed: {
    hasFooter() {
      return this.selections.length > 1
    }
  },
  methods: {
    confirm() {
      this.activeIndex = null
      this.$modal.close()
      this.determineCodes = jsonClone(this.cacheSelected)
      const callbackSelected = this.determineCodes.map(
        ({value, text, pValue}) => value === undefined ? pValue : value)
      this.$emit('toggleActive', callbackSelected)
    },
    async toggleSelector(index) {
      this.selections || await this.getSelections()
      this.activeIndex = index
      const {selections} = this
      const {value, pValue} = this.cacheSelected[index] || {}
      this.$modal.open({
        component: import('./CombinationModal'),
        options: {
          show: true,
          backdrop: true,
          destroy: false,
          footer: true
        },
        props: {
          select: (value, text, pValue) => {
            this.cacheSelected[index] = {
              value, text, pValue
            }
            if (!this.hasFooter) {
              this.confirm()
            }
          },
          selectionCode: value === undefined ? pValue : value,
          selection: selections[index],
          hasFooter: this.hasFooter,
          close: () => {
            this.activeIndex = null
            this.cacheSelected = jsonClone(this.determineCodes)
            this.$modal.close()
          },
          confirm: () => {
            this.confirm()
          },
          beforeEnter: () => {
            this.content = this.$refs.content.innerHTML
          },
          afterEnter: () => {
            this.active = true
          },
          beforeLeave: () => {
            this.active = false
          }
        }
      })
    }
  }
})

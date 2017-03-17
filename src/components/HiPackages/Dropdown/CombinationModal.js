import classes from './combination-modal.styl'
import {isObject, isArray, REQUIRED_OBJECT} from 'utils'
import ModalItem from 'components/HiModal/ModalItem'

export default require('./combination-modal.pug')({
  data() {
    return {
      classes,
      pValue: null,
      nValue: null
    }
  },
  props: {
    selection: REQUIRED_OBJECT,
    beforeEnter: Function,
    afterEnter: Function,
    beforeLeave: Function,
    afterLeave: Function,
    hasFooter: Boolean,
    selectionCode: String | Number,
    select: Function,
    confirm: Function,
    close: Function
  },
  mounted() {
    const {selectionCode} = this
    let pSection
    let nSection
    pSection = this.originSelections.find(({key}) => {
      return key === selectionCode
    })
    !pSection && (pSection = this.originSelections.find(({subSections = []}) => {
      nSection = subSections.find(({key}) => {
        return key === selectionCode
      })
      return nSection
    }))
    this.pValue = pSection ? pSection.key : null
    this.nValue = nSection ? nSection.key : null
  },
  methods: {
    triggerSelect(value, text, pValue) {
      if (this.hasSubSelections) {
        this.select(value, text, pValue)
      } else {
        this.select(pValue, text)
      }
    },
    selectItem(value, text) {
      this.pValue = value
      this.nValue = null
      this.triggerSelect(this.nValue, text, this.pValue)
    },
    selectSubItem(value, text) {
      this.nValue = value
      this.triggerSelect(this.nValue, text, this.pValue)
    }
  },
  computed: {
    hasSubSelections() {
      return !!this.selection.subSectionsKey
    },
    originSelections() {
      const {
        selections = [],
        valueKey = '',
        textKey = '',
        subSectionsKey = '',
        subValueKey = '',
        subTextKey = ''
      } = this.selection
      if (isObject(selections)) {
        return Object.entries(selections).map((entry) => {
          return Object.assign({key: entry[0], value: entry[1], subSections: []})
        })
      } else if (isArray(selections)) {
        return selections.map((section, index) => {
          let subSections = []
          if (!isObject(section)) {
            return {
              key: index,
              value: section
            }
          }
          if (subSectionsKey && isArray(section[subSectionsKey])) {
            subSections = section[subSectionsKey].map(subSection => {
              return {key: subSection[subValueKey], value: subSection[subTextKey]}
            })
          }
          return Object.assign({key: section[valueKey], value: section[textKey]}, {subSections})
        })
      }
    },
    subSelections() {
      const {pValue} = this
      const curr = this.originSelections.find(({key}) => {
        return key === pValue
      })
      return curr ? curr['subSections'] : []
    }
  },
  components: {
    ModalItem
  }
})

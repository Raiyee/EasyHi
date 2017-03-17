import classes from './dropdown-navigator.styl'
import {isObject, isArray} from 'utils'

export default require('./dropdown-navigator.pug')({
  data() {
    return {
      classes,
      isOpen: false,
      sectionCode: this.currKey,
      currSectionName: null
    }
  },
  props: {
    sections: Object | Array,
    keyWord: String,
    valueWord: String,
    currKey: {
      type: String | Number,
      default: null
    },
    subSectionsWord: String,
    subKeyWord: String,
    subValueWord: String,
    close: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    const {sectionCode} = this
    let pSection
    let nSection
    pSection = this.originSections.find(({key}) => {
      return key === sectionCode
    })
    !pSection && (pSection = this.originSections.find(({subSections = []}) => {
      nSection = subSections.find(({key}) => {
        return key === sectionCode
      })
      return nSection
    }))
    this.currSectionName = nSection ? nSection.value : pSection ? pSection.value : this.originSections[0].value
  },
  methods: {
    toggleDropdown() {
      const self = this
      const {originSections, sectionCode, currSectionName} = this
      this.cacheCode = sectionCode
      this.cacheValue = currSectionName
      this.isOpen = true
      this.$modal.open({
        component: import('./DropdownModal'),
        options: {
          backdrop: true,
          destroy: false,
          show: true
        },
        props: {
          close() {
            self.isOpen = false
            self.sectionCode = self.cacheCode
            self.currSectionName = self.cacheValue
            self.$modal.close()
          },
          sections: originSections,
          sectionCode: this.sectionCode || this.originSections[0].key,
          hasSubSections: !!self.subSectionsWord,
          needClose: self.close,
          select: (code, value, preCode) => {
            this.cacheCode = code || preCode
            this.cacheValue = value
            this.$emit('toggleActive', code, preCode)
          }
        }
      })
    }
  },
  computed: {
    originSections() {
      const {sections, keyWord, valueWord, subSectionsWord, subKeyWord, subValueWord} = this
      if (isObject(sections)) {
        return Object.entries(sections).map((entry) => {
          return Object.assign({key: entry[0], value: entry[1], subSections: []})
        })
      } else if (isArray(sections)) {
        return this.sections.map(section => {
          let subSections = []
          if (this.subSectionsWord && isArray(section[subSectionsWord])) {
            subSections = section[subSectionsWord].map(subSection => {
              return {key: subSection[subKeyWord], value: subSection[subValueWord]}
            })
          }
          return Object.assign({key: section[keyWord], value: section[valueWord]}, {subSections})
        })
      }
    }
  }
})

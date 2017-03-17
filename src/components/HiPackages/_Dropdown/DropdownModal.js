import ModalItem from 'components/HiModal/ModalItem'
import classes from './dropdown-modal.styl'
import {isEmptyArr} from 'utils'

export default require('./dropdown-modal.pug')({
  data() {
    return {
      classes,
      pCode: null,
      nCode: null
    }
  },
  props: {
    select: Function,
    notice: Function,
    sections: Array,
    sectionCode: [String, Object, Number],
    hasSubSections: Boolean,
    needClose: Boolean,
    close: Function
  },
  mounted() {
    const {sectionCode} = this
    let pSection
    let nSection
    pSection = this.sections.find(({key}) => {
      return key === sectionCode
    })
    !pSection && (pSection = this.sections.find(({subSections = []}) => {
      nSection = subSections.find(({key}) => {
        return key === sectionCode
      })
      return nSection
    }))
    this.pCode = pSection ? pSection.key : null
    this.nCode = nSection ? nSection.key : null
  },
  methods: {
    selectItem(code, value) {
      this.pCode = code
      this.nCode = null
      this.select(this.nCode, value, this.pCode)
      if (!this.hasSubSections) {
        this.needClose && this.close()
      } else {
        isEmptyArr(this.subSections) && this.needClose && this.$modal.close()
      }
    },
    selectSubItem(code, value) {
      this.nCode = code
      this.select(code, value, this.pCode)
      this.needClose && this.$modal.close()
    }
  },
  computed: {
    subSections() {
      const {pCode} = this
      const curr = this.sections.find(({key}) => {
        return key === pCode
      })
      return curr ? curr['subSections'] : []
    }
  },
  components: {
    ModalItem
  }
})

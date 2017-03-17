import ModalItem from 'components/HiModal/ModalItem'
import classes from './select-modal.styl'

export default require('./select-modal.pug')({
  data() {
    return {
      classes,
      ...this.curr
    }
  },
  props: {
    sections: Object,
    sectionsType: String,
    confirm: Function,
    close: Function,
    curr: Object
  },
  methods: {
    clickLeftItem(code) {
      switch (this.sectionsType) {
        case 'time':
          this.currTimeCode = code
          break
        case 'card':
          this.currCardTypeId = code
          this.currCardId = null
          break
        case 'people':
          this.currPeopleCode = code
          break
      }
    },
    clickRightItem(code) {
      this.currCardId = code
    },
    confirmModal() {
      this.confirm(this, ...arguments)
    }
  },
  computed: {
    currCards: function () {
      const cardTypes = this.sections['card']
      if (this.currCardTypeId) {
        const {cards} = cardTypes.find(cardType => {
          return cardType.cardTypeId === this.currCardTypeId
        })
        return cards || []
      }
      return []
    }
  },
  components: {
    ModalItem
  }
})

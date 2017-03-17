import HiTab from 'components/HiTab'
import CardName from 'components/HiCard/CardName'
import ModalItem from 'components/HiModal/ModalItem'

import {mapGetters} from 'vuex'

import {remove} from 'utils'

import classes from './cards-modal.styl'

export default require('./cards-modal.pug')({
  props: {
    cardTypeId: String,
    cardTypes: Array,
    cards: Array,
    offSalesCards: Array,
    confirm: Function
  },
  data() {
    return {
      classes,
      currCardTypeId: this.cardTypeId,
      selectedCards: []
    }
  },
  computed: {
    ...mapGetters(['winHeight', 'rem']),
    defaultIndex() {
      return this.cardTypes.findIndex(cardType => cardType.cardTypeId === this.cardTypeId)
    },
    disabled() {
      return !this.selectedCards.length
    },
    height() {
      return this.winHeight - (41 + 63) * this.rem + 'px'
    },
    currCards() {
      return this.cards.filter(card => card.cardTypeId === this.currCardTypeId)
    },
    currOffSalesCards() {
      return this.offSalesCards.filter(card => card.cardTypeId === this.currCardTypeId)
    }
  },
  watch: {
    cardTypeId(cardTypeId) {
      this.currCardTypeId = cardTypeId
    }
  },
  methods: {
    toggleTab(index, cardTypeId) {
      this.currCardTypeId = cardTypeId
      this.selectedCards = []
    },
    selectCard(cardId) {
      const {selectedCards} = this
      remove(selectedCards, cardId) || selectedCards.push(cardId)
    },
    closeModal() {
      this.$modal.close()
      this.selectedCards = []
    },
    confirmModal() {
      if (this.disabled) return
      this.confirm(this, ...arguments)
    }
  },
  components: {
    HiTab,
    CardName,
    ModalItem
  }
})

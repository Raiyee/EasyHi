import HiTab from 'components/HiTab'

import CardName from 'components/HiCard/CardName'

import {mapGetters} from 'vuex'

import {openModal, remove} from 'utils'

import classes from './index.styl'

const CHOOSE_CARDS = 'choose-cards'

export default require('./index.pug')({
  name: 'card-sales',
  data() {
    const meta = this.$route.meta
    const {data, auth} = meta

    return {
      classes,
      cardTypeId: null,
      auth: !!auth,
      soldCardsNum: data.soldCardsNum,
      cardTypes: data.cardTypes,
      items: [
        {
          cardTypeId: null,
          cardTypeName: '全部'
        },
        ...data.cardTypes
      ],
      cards: data.cards || [],
      offSalesCards: null
    }
  },
  computed: {
    ...mapGetters(['serviceMobile']),
    currCards() {
      const {cards, cardTypeId} = this
      return cardTypeId ? cards.filter(card => card.cardTypeId === cardTypeId) : cards
    }
  },
  destroyed() {
    this.$modal.close(CHOOSE_CARDS, true)
  },
  methods: {
    toggleTab(index, cardTypeId) {
      this.cardTypeId = cardTypeId
    },
    addCards() {
      return this.offSalesCards ? this.chooseCards() : this.$http.get('/card-sales/get-cards/unSellCard')
        .then(({data: {cards}}) => {
          this.offSalesCards = cards
          this.chooseCards()
        })
    },
    chooseCards() {
      const {cards, offSalesCards} = this
      const cardTypeId = this.cardTypeId || this.cardTypes[0].cardTypeId
      try {
        openModal({
          id: CHOOSE_CARDS,
          options: {
            show: true
          },
          props: {
            cardTypeId
          }
        })
      } catch (e) {
        this.$modal.open({
          id: CHOOSE_CARDS,
          component: import('./CardsModal'),
          options: {
            show: true
          },
          props: {
            cards: this.cards,
            offSalesCards,
            cardTypes: this.cardTypes,
            cardTypeId,
            confirm() {
              const {selectedCards} = this

              this.$http.post('/card-sales/update-sell-state/ON', selectedCards).then(() => {
                offSalesCards
                  .filter(card => selectedCards.includes(card.cardId))
                  .forEach(card => {
                    cards.push(card)
                    remove(offSalesCards, offCard => offCard.cardId === card.cardId)
                  })
                this.$modal.close()
              })
            }
          }
        })
      }
    }
  },
  components: {
    HiTab,
    CardName
  }
})

import {CARD} from 'flow/card'

import Card from './Card'
import classes from './card-name.styl'

export default require('./card-name.pug')({
  props: {
    card: {
      type: Object,
      validator: (card: CARD) => true
    },
    selected: {
      type: Boolean,
      default: false
    },
    selectable: Boolean,
    soldNumState: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      classes
    }
  },
  computed: {
    cardTimes() {
      const {cardLimit, cardDiscount, cardTimes, isValueCard} = this.card
      return cardLimit ? ('消费上限: ' + cardLimit)
        : isValueCard ? ('消费折扣: ' + (cardDiscount === 10 ? '无' : (cardDiscount + '折')))
          : ('次数: ' + (cardTimes === -1 ? '无限次' : (cardTimes + '次')))
    },
    deadLine() {
      return '有效期: ' + (this.card.cardExpired || '无限期')
    }
  },
  components: {
    Card
  }
})

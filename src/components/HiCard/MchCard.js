import {MBR_CARD} from 'flow/card'

import classes from './mch-card.styl'
import Card from './Card'

export default require('./mch-card.pug')({
  name: 'mch-card',
  props: {
    card: {
      type: Object,
      validator: (card: MBR_CARD) => true
    },
    hasOperation: Boolean,
    selected: Boolean
  },
  data() {
    const {card} = this

    const state = card.forbidden ? 'forbidden'
      : card.transferred ? 'transferred'
      : card.expired ? 'expired'
      : card.state ? '' : 'inactive'
    return {
      classes,
      cardState: state && `${require(`assets/card/${state}.png`)}`
    }
  },
  computed: {
    cardTimes() {
      const {card: {isValueCard, cardLimit, cardTimes}} = this
      return `${isValueCard
      ? '金额:' + cardTimes + '元 ' : cardLimit
      ? '消费上限:' + cardLimit
      : '次数：' + (cardTimes === -1 ? '无限' : cardTimes) + '次'}`
    },
    availTimes() {
      const {card: {isValueCard, cardLimit, availTimes}} = this
      return `${cardLimit ? '' : '(剩' + availTimes + (isValueCard ? '元' : '次') + ')'}`
    },
    cardDiscount() {
      const {card: {cardDiscount}} = this
      return `消费折扣:${!cardDiscount || cardDiscount === 10 ? '无' : cardDiscount + '折'}`
    },
    deadLine() {
      return '有效期: ' + (this.card.cardExpired || '无限期')
    }
  },
  components: {
    Card
  }
})

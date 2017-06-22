import {mapGetters} from 'vuex'
import moment from 'moment'

import {alert, DATE_FORMAT, combineDuration} from 'utils'

import {MBR_CARD} from 'flow/card'

import classes from './mbr-card.styl'
import Card from './Card'

export default require('./mbr-card.pug')({
  props: {
    card: {
      type: Object,
      validator: (card: MBR_CARD) => true
    },
    benchmark: Number,
    selectable: Boolean,
    selected: Boolean,
    hasOperation: {
      type: Boolean,
      default: false
    },
    usable: {
      type: Boolean,
      default: true
    }
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
    ...mapGetters(['memberUrlPrefix', 'isEnterprise']),
    cardSurplusUnit() {
      return `${(this.card.cardLimit && this.card.state) ? '本周' : ''}剩余`
    },
    cardRemainingEnough() {
      const {card: {isValueCard, availTimes, cardDiscount}, benchmark} = this
      return `${(!benchmark || benchmark * (isValueCard ? cardDiscount / 10 : 1) <= availTimes)
        ? '' : isValueCard
          ? '余额不足' : '次数不足'}`
    },
    cardTimes() {
      const {card} = this
      if (!card.isValueCard && card.availTimes < 0) return '无限次'
      return card.availTimes
    },
    cardTimeUnit() {
      const {card} = this
      if (!card.isValueCard) return card.availTimes >= 0 ? '次数' : ''
      const discount = card.cardDiscount
      return '元' + (discount && discount !== 10 ? '(消费享' + discount + '折)' : '')
    },
    deadLine() {
      const {cardExpired, cardExpiredRange} = this.card
      return '有效期: ' + (cardExpired || (cardExpiredRange ? combineDuration(cardExpiredRange) : '无限期'))
    },
    renewable() {
      const {card: {availTimes, isValueCard, cardLimit, cardExpired, state, transferred, cardExpiredRange},
        usable} = this

      if (!state) return false

      if (usable) {
        if (!cardExpired && (availTimes < 0 || cardLimit)) return false
      }

      if (!usable) {
        if (transferred) return false
      }
      const expired = moment().add(15, 'days').format(DATE_FORMAT)
      return expired >= (cardExpiredRange && cardExpiredRange[1]) ||
              (!cardLimit && availTimes >= 0 && availTimes <= (isValueCard ? 500 : 5))
    }
  },
  methods: {
    showSlot() {
      alert('本卡限制以下时断使用:<br/>' + this.card.applicablePeriods
        .map(({startTime, endTime}) => startTime + '-' + endTime).join(',<br/>'))
    },
    memberCardDetail() {
      location.href = this.memberUrlPrefix + 'member-center/member-card-consume-detail/' + this.card.mbrCardId
    }
  },
  components: {
    Card
  }
})

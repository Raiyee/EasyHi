import classes from './index.styl'

import {nonEmptyArr, monthText} from 'utils'
import axios from 'axios'

export default require('./index.pug')({
  data() {
    const currCardId = this.$route.params.cardId

    return {
      classes,
      selectTypes: {time: [], card: [], people: []},
      cards: [],
      currCardTypeId: null,
      currCardId,
      currTimeCode: '0',
      currPeopleCode: 1,
      openType: null
    }
  },
  computed: {
    currTimeName: function () {
      return this.selectTypes.time[this.currTimeCode + '']
    },
    currCardName: function () {
      let currCardName = '全部卡类'

      this.selectTypes.card.find(({cardTypeId, cardTypeName, cards}) => {
        if (this.currCardId) {
          return nonEmptyArr(cards) && cards.find(({cardTypeId, cardId, cardName}) => {
            return cardId === this.currCardId && (currCardName = cardName)
          })
        } else {
          return cardTypeId === this.currCardTypeId && (currCardName = cardTypeName)
        }
      }
      )
      return currCardName
    },
    currPeopleName: function () {
      return this.selectTypes.people[this.currPeopleCode + '']
    }
  },
  beforeRouteEnter(to, from, next) {
    const {cardId} = to.params
    axios.post(`/card-sales/queryConditionsAndCardList?init=true${cardId ? '&cardId=' + cardId : ''}`, {
      timeLimit: '0'
    }).then(({data}) => {
      next(vm => {
        const {cards, cardTypes = []} = data
        cardTypes.forEach(({cardTypeName, cardTypeId, cards}) =>
          cards.unshift({
            cardId: null,
            cardTypeId,
            cardName: '全部' + cardTypeName
          })
        )
        cardTypes.unshift({
          cardTypeId: null,
          cardTypeName: '全部卡类'
        })

        const selectTypes = {
          time: {
            '': '所有时间',
            0: '本月',
            '-1': monthText(null, -1),
            '-2': monthText(null, -2),
            '-3': monthText(null, -3),
            '-4': '三个月之前'
          },
          card: cardTypes,
          people: {
            1: '所有人',
            2: '新会员',
            3: '老会员'
          }
        }

        vm.cards = cards
        vm.selectTypes = selectTypes
        vm.cardTypes = cardTypes

        cardId && cardTypes.find(({cards}) => {
          return cards && cards.find((card) => {
            cardId === card.cardId && (vm.currCardTypeId = card.cardTypeId)
            return cardId === card.cardId
          })
        })
      })
    })
  },
  methods: {
    itemEvent(type) {
      const self = this
      const {currTimeCode, currCardTypeId, currCardId, currPeopleCode} = this
      this.$modal.open({
        id: 'select-modal',
        component: import('./SelectModal'),
        options: {
          backdrop: true,
          destroy: true,
          show: true
        },
        props: {
          curr: {
            currTimeCode,
            currCardTypeId,
            currCardId,
            currPeopleCode
          },
          sections: this.selectTypes,
          sectionsType: type,
          close() {
            self.$modal.close()
            self.openType = null
          },
          confirm() {
            const {currTimeCode, currCardTypeId, currCardId, currPeopleCode} = this

            Object.assign(self, {
              currTimeCode,
              currCardTypeId,
              currCardId,
              currPeopleCode
            })

            self.$http.post('/card-sales/queryConditionsAndCardList', {
              timeLimit: currTimeCode,
              cardTypeId: currCardTypeId,
              cardId: currCardId,
              mbrType: currPeopleCode
            }).then(data => {
              self.cards = data.data.cards
              self.$modal.close()
              self.openType = null
            })
          }
        }
      })
      this.openType = type
    }
  }
})

import dropdown from 'components/HiDropdown'
import classes from './index.styl'

export default require('./index.pug')({
  data() {
    const selections1 = {
      11: '支付方式',
      22: '扫码支付',
      33: '卡支付'
    }
    const selections4 = ['支付方式', '扫码支付', '卡支付']
    const selections2 = [{
      code: 1001,
      name: '第一个'
    }, {
      code: 1002,
      name: '第二个'
    }, {
      code: 1003,
      name: '第三个'
    }]
    const selections3 = [
      {
        cardTypeId: null,
        cardTypeName: '全部卡',
        cards: []
      },
      {
        cardTypeId: 1001,
        cardTypeName: '年卡',
        cards: [
          {
            cardId: null,
            cardName: '全部年卡'
          },
          {
            cardId: 1101,
            cardName: '年卡A'
          }, {
            cardId: 1102,
            cardName: '年卡B'
          }, {
            cardId: 1103,
            cardName: '年卡C'
          }]
      },
      {
        cardTypeId: 2001,
        cardTypeName: '私教卡',
        cards: [
          {
            cardId: null,
            cardName: '全部私教卡'
          }, {
            cardId: 2101,
            cardName: '私教卡A'
          }, {
            cardId: 3102,
            cardName: '私教卡B'
          }, {
            cardId: 4103,
            cardName: '私教卡C'
          }]
      },
      {
        cardTypeId: 3001,
        cardTypeName: '次卡',
        cards: [{
          cardId: null,
          cardName: '全部次卡'
        }, {
          cardId: 3101,
          cardName: '次卡A'
        }, {
          cardId: 3102,
          cardName: '次卡B'
        }, {
          cardId: 3103,
          cardName: '次卡C'
        }]
      }
    ]

    this.comb = [{
      selections: selections1
    }, {
      selections: selections4
    }, {
      selections: selections2,
      valueKey: 'code',
      textKey: 'name'
    }, {
      selections: selections3,
      valueKey: 'cardTypeId',
      textKey: 'cardTypeName',
      subSectionsKey: 'cards',
      subValueKey: 'cardId',
      subTextKey: 'cardName'
    }]

    return {
      classes,
      selections: this.comb,
      selected: [{
        value: '22',
        text: '扫码支付'
      }, {
        value: 2,
        text: '卡支付'
      }, {
        value: 1001,
        text: '第一个'
      }, {
        value: 1102,
        text: '年卡B'
      }],
      getSelections: this.getSec
    }
  },
  methods: {
    toggleActive: function (args) {
      // console.log(...args)
    },
    getSec() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.selections = this.comb
          resolve()
        }, 1000)
      })
    }
  },
  components: {
    dropdown
  }
})

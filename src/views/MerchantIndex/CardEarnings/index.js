import classes from './index.styl'
import dropdown from 'components/HiDropdown'

import {log} from 'utils'
import {mapGetters} from 'vuex'

const payType = typeId => ['刷卡', '现金', '在线支付', '扫码支付', '转账(微信/支付宝/银行卡等)', '其他'][typeId]
const payTypeWithOutBracket = typeId => ['刷卡', '现金', '在线支付', '扫码支付', '转账', '其他'][typeId]

export default require('./index.pug')({
  filters: {payTypeWithOutBracket},
  data() {
    const {earningsDetails, cardTypeList, paging} = this.$route.meta.data
    const payTypeIds = [0, 1, 2, 3, 4, 5]
    if (!this.$store.getters.isEnterprise) payTypeIds.splice(2, 2)
    const payTypeSelections = payTypeIds.map((val) => {
      return {
        payTypeId: val,
        payTypeName: payType(val)
      }
    })
    payTypeSelections.unshift({
      payTypeId: null,
      payTypeName: '全部'
    })
    cardTypeList.map(({cardTypeId, cardTypeName, cards}) => {
      cards.unshift({
        cardId: null,
        cardName: `全部${cardTypeName}`
      })
      return {
        cardTypeId,
        cardTypeName,
        cards
      }
    })
    cardTypeList.unshift({
      cardTypeId: null,
      cardTypeName: '全部卡'
    })

    const comb = [{
      selections: payTypeSelections,
      valueKey: 'payTypeId',
      textKey: 'payTypeName'
    }, {
      selections: cardTypeList,
      valueKey: 'cardTypeId',
      textKey: 'cardTypeName',
      subSectionsKey: 'cards',
      subValueKey: 'cardId',
      subTextKey: 'cardName'
    }]

    return {
      classes,
      earningsDetails,
      pagingData: paging,
      selections: comb,
      selected: [{
        value: null,
        text: '支付方式'
      }, {
        value: null,
        text: '全部卡'
      }],
      currPayTypeId: '',
      currCardId: ''
    }
  },
  components: {
    dropdown
  },
  computed: {
    ...mapGetters(['merchantUrlPrefix'])
  },
  methods: {
    queryData(currPage) {
      const {totalPage, pageSize} = this.pagingData
      const self = this
      return this.$http.post('/card/get-earnings', {
        currPage,
        pageSize,
        totalPage,
        payType: self.currPayTypeId,
        cardId: self.currCardId,
        init: false
      })
    },
    async toggleActive([payTypeId, cardId]) {
      this.currPayTypeId = payTypeId
      this.currCardId = cardId
      const {
        data: {earningsDetails, paging}
      } = await this.queryData(1)
      this.pagingData = paging
      this.earningsDetails = earningsDetails
    },
    async paging() {
      const {currPage, totalPage} = this.pagingData
      const self = this
      if (currPage >= totalPage) return
      const {
        data: {earningsDetails: newEarningsDetails, paging}
      } = await this.queryData(currPage + 1)
      this.pagingData = paging
      const {earningsDuration, totalEarnings, earningsDetail} = this.earningsDetails[self.earningsDetails.length - 1]
      const {earningsDuration: newEarningsDuration, earningsDetail: newEarningsDetail} = newEarningsDetails[0]
      if (earningsDuration === newEarningsDuration) {
        this.earningsDetails[self.earningsDetails.length - 1] = {
          earningsDuration,
          totalEarnings,
          earningsDetail: [].concat(earningsDetail, newEarningsDetail)
        }
        newEarningsDetails.splice(0, 1)
      }
      this.earningsDetails.push(...newEarningsDetails)
      log(this.earningsDetails)
    },
    toCardDetail(cardId) {
      location.href = `${this.merchantUrlPrefix}mbrcard/detail/${cardId}`
    }
  }
})

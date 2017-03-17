import {mapGetters} from 'vuex'

import SubtractAddModule from 'components/HiPackages/SubtractAddModule'
import PanelItem from './PanelItem'

import {imgPath, toast, alert, confirm, toNum, isEmptyObject, isEmptyArr} from 'utils'

import classes from './index.styl'

const MAX_INTEGER = Number.MAX_SAFE_INTEGER

export default require('./index.pug')({
  name: 'subscribe-schedule',
  data() {
    const {
      meta: {
        data: {
          schedule, usefulMbrExpVoucher, usefulMbrCards,
          uselessMbrExpVoucher, uselessMbrCards, subscribeData
        }
      },
      params: {userId}
    } = this.$route

    // isHelpSubscribe 帮订页面/-预订页面
    const isHelpSubscribe = !!userId

    const {maxSubTimes} = subscribeData

    const SubtractAddData =
      isHelpSubscribe ? {min: 1, step: 1, curr: 1} : {
        max: maxSubTimes === -1 ? MAX_INTEGER : maxSubTimes,
        min: 1,
        step: 1,
        curr: 1
      }
    const SubtractAddData1 = {
      min: 0,
      step: 1,
      curr: 0,
      foreign: 0,
      max: this.maxTimes || undefined
    }

    return {
      classes,
      schedule,
      usefulMbrExpVoucher,
      uselessMbrExpVoucher,
      usefulMbrCards,
      uselessMbrCards,
      subscribeType: schedule.subscribeType,
      subscribeData,
      isHelpSubscribe,
      currNum: 0,
      checkedExpvoucher: !isEmptyArr(usefulMbrExpVoucher) ? usefulMbrExpVoucher[0] : {},
      checkedCard: !isEmptyArr(usefulMbrExpVoucher) ? {} : isEmptyArr(usefulMbrCards) ? {} : usefulMbrCards[0],
      isValueCard: !isEmptyArr(usefulMbrCards) && usefulMbrCards[0].isValueCard || false,
      subscribePersonNum: 1,
      timesCardSubtractNum: 0,
      SubtractAddData,
      SubtractAddData1,
      // 手动点击下面那个加减框记录的值
      subtractAddDataStepSum: 0,
      voucherIsOpen: false,
      cardIsOpen: false,
      voucherStyle: {
        height: 'auto'
      },
      cardStyle: {
        height: 'auto'
      }
    }
  },
  mounted() {
    const {vouchersElement, cardsElement} = this.$refs
    // 临时解决cssmodule在mounted还没渲染的问题
    this.vouchersHeight = vouchersElement.offsetHeight + vouchersElement.children.length - 2
    this.cardsHeight = cardsElement.offsetHeight + cardsElement.children.length * 2 - 2
    // -1px 透支下划线，避免出现两根
    this.firstVoucherHeight = vouchersElement.children[0].offsetHeight - 1
    this.firstCardHeight = cardsElement.children[0].offsetHeight - 1

    this.voucherStyle.height = this.firstVoucherHeight + 'px'
    this.cardStyle.height = this.firstCardHeight + 'px'

    // // 初始化时给子组件赋值
    if ((this.isHelpSubscribe)) this.SubtractAddData1.curr = this.cardOriginConsume
  },
  watch: {
    checkedCard(val, preVal) {
      this.isValueCard = (isEmptyObject(this.checkedCard) ? preVal.isValueCard : val.isValueCard)
    },
    cardOriginConsume(value) {
      if ((this.isHelpSubscribe)) this.SubtractAddData1.curr = value + this.subtractAddDataStepSum
    }
  },
  computed: {
    ...mapGetters(['merchantUrlPrefix', 'coachAlias', 'memberUrlPrefix', 'style', 'winHeight', 'rem']),
    height() {
      return this.winHeight - 70 * this.rem + 'px'
    },
    maxTimes() {
      return isEmptyObject(this.checkedCard) ? 0
        : (this.checkedCard.availTimes < 0 ? MAX_INTEGER : this.checkedCard.availTimes)
    },
    parseIcon() {
      return this.schedule.picUrl ? imgPath(this.schedule.picUrl)
        : require(`assets/portrait/member-male.jpg`)
    },
    forbidden() {
      return !this.isHelpSubscribe && isEmptyObject(this.checkedCard) && isEmptyObject(this.checkedExpvoucher)
    },
    forbidden1() {
      return isEmptyObject(this.checkedCard)
    },
    voucherConsume() {
      return !isEmptyObject(this.checkedExpvoucher)
        ? Math.min(this.subscribePersonNum, toNum(this.checkedExpvoucher.vestigialTimes)) : 0
    },
    // 折扣之前的次数,仅仅适用于预定
    cardOriginConsume() {
      return !isEmptyObject(this.checkedCard)
        ? (this.subscribePersonNum - this.voucherConsume) * this.checkedCard.deductTimes : 0
    },
    // 根据折扣算出当前选中卡所需要支付的金额或者次数
    cardConsume() {
      return !isEmptyObject(this.checkedCard) ? this.cardOriginConsume * this.checkedCard.discount / 10 : 0
    },
    cardDiscountConsume() {
      return !isEmptyObject(this.checkedCard) ? this.cardOriginConsume * (10 - this.checkedCard.discount) / 10 : 0
    },
    // 根据折扣算出来当前选中卡最多可以支付的金额或者次数
    realAvailTimes() {
      return !isEmptyObject(this.checkedCard)
        ? this.maxTimes / (this.isValueCard ? this.checkedCard.discount : 10) * 10 : 0
    },
    canConfirm() {
      if (this.isHelpSubscribe ||
        (!isEmptyObject(this.checkedCard) && this.checkedCard.availTimes < 0) ||
        this.checkedCard.deductTimes <= 0) return true
      return this.voucherConsume + toNum(this.realAvailTimes / this.checkedCard.deductTimes) >=
        this.subscribePersonNum
    }
  },
  methods: {
    subtractOrAddEvent(curr) {
      if (this.forbidden) {
        toast({
          tipText: '请选择可用的卡或券'
        })
      } else {
        this.subscribePersonNum = curr
      }
    },
    subtractOrAddEvent1(curr, step) {
      this.timesCardSubtractNum = curr
      this.subtractAddDataStepSum += step
    },
    select(item, itemType, isSelect) {
      isSelect
        ? (itemType === 'card' ? this.checkedCard = item : this.checkedExpvoucher = item)
        : (itemType === 'card' ? this.checkedCard = {} : this.checkedExpvoucher = {})
      this.SubtractAddData1.curr = this.cardOriginConsume
      this.subtractAddDataStepSum = 0
    },
    drop(type) {
      type === 'voucher' &&
      (this.voucherStyle.height =
        ((this.voucherIsOpen = !this.voucherIsOpen) ? this.vouchersHeight : this.firstVoucherHeight) + 'px')
      type === 'card' &&
      (this.cardStyle.height =
        ((this.cardIsOpen = !this.cardIsOpen) ? this.cardsHeight : this.firstCardHeight) + 'px')
    },
    confirmSubscribe() {
      if (!this.canConfirm && (!isEmptyObject(this.checkedExpvoucher) || !isEmptyObject(this.checkedCard))) {
        const itemName = !isEmptyObject(this.checkedCard) && this.checkedCard.cardName ||
          this.checkedExpvoucher.expvoucherName
        return toast({
          tipText: `啊哦，${itemName}余额不足抵扣`
        })
      }
      if (this.isHelpSubscribe) return this.confirmHelpSubscribe()
      if (this.schedule.offNum !== 0 && !this.canConfirm) return
      const self = this
      const {expvoucherInstId, expvoucherName} = this.checkedExpvoucher
      const {mbrCardId, cardName} = this.checkedCard

      const cardPay = Object.assign({}, this.subscribeData.cardPay, {
        payId: mbrCardId,
        times: this.cardOriginConsume,
        payTypeName: cardName
      })
      const ticketPay = Object.assign({}, this.subscribeData.ticketPay, {
        payId: expvoucherInstId,
        times: this.voucherConsume,
        payTypeName: expvoucherName
      })

      const memberSubscribeData = Object.assign({}, this.subscribeData, {
        cardPay, ticketPay
      }, {
        subscribeNum: this.subscribePersonNum
      })

      this.$http.post('/subscribe/member-subscribe', memberSubscribeData).then(ret => {
        const {code, desc} = ret.data
        switch (code) {
          case '0':
            toast({
              tipText: '预订成功',
              close: () => this.$router.push('/subscribe-index')
            })
            break
          case '1':
            toast({
              tipText: desc
            })
            break
          case '2':
            confirm({
              tipText: desc,
              confirm() {
                self.subscribeData.ignoreUnCancelSchedule = true
                self.confirmSubscribe()
                self.$modal.close()
              }
            })
            break
          case '3':
            alert({
              tipText: desc,
              confirm() {
                location.href = `${self.memberUrlPrefix}member-subscribe/subscribe-course`
              }
            })
            break
          case '4':
            alert({
              tipText: desc,
              confirm() {
                location.reload()
              }
            })
            break
          default:
            return alert({
              tipText: ''
            })
        }
      })
    },
    confirmHelpSubscribe(options) {
      options = options || {}
      const self = this
      let tipText
      const {expvoucherInstId, expvoucherName} = this.checkedExpvoucher
      const {mbrCardId, cardName} = this.checkedCard

      if (!options.ignoreCost && this.schedule.offNum > 0) {
        if (isEmptyArr(this.usefulMbrExpVoucher) && isEmptyArr(this.usefulMbrCards)) {
          tipText = '该会员没有会员卡或优惠券来抵扣本课程，确定继续预订吗？'
        } else if (this.forbidden) {
          tipText = '您还未选择扣次的会员卡或优惠券，确定继续预订吗？'
        }
      }
      if (tipText) {
        return confirm({
          tipText: tipText,
          confirm() {
            self.confirmHelpSubscribe({ignoreCost: true})
          }
        })
      }
      const cardPay = Object.assign({}, this.subscribeData.cardPay, {
        payId: mbrCardId,
        times: this.cardOriginConsume + this.subtractAddDataStepSum,
        payTypeName: cardName
      })
      const ticketPay = Object.assign({}, this.subscribeData.ticketPay, {
        payId: expvoucherInstId,
        times: this.voucherConsume,
        payTypeName: expvoucherName
      })
      const memberSubscribeData = Object.assign({}, this.subscribeData, {
        cardPay, ticketPay
      })
      options.subscribeNum = this.subscribePersonNum
      this.$http.post('/subscribe/merchant-subscribe', Object.assign({}, memberSubscribeData, options))
        .then((ret) => {
          const {code, desc, data} = ret.data
          let ignore
          switch (code) {
            case '0':
              return toast({
                tipText: desc,
                close() {
                  location.href =
                    `${self.merchantUrlPrefix}merchant-single-schedule-detail/${self.schedule.scheduleId}`
                }
              })
            case '1':
              return alert({
                tipText: desc,
                confirm() {
                  location.href = `${self.merchantUrlPrefix}merchantsubscribe/index`
                }
              })
            case '2':
              switch (data) {
                case '1001':
                  ignore = {ignoreMbrCost: true}
                  break
                case '1002':
                  ignore = {ignoreMbrRemain: true}
                  break
                case '1003':
                  ignore = {ignoreScheduleRemain: true}
                  break
                case '1004':
                  ignore = {ignoreSubscribe: true}
                  break
              }
              break
            case '3':
              return alert({
                tipText: desc,
                confirm: () => this.$router.push('/subscribe-index')
              })
            case '4':
              return alert({
                tipText: desc,
                confirm() {
                  location.reload()
                }
              })
          }
          ignore && confirm({
            tipText: desc,
            confirm() {
              self.confirmHelpSubscribe(Object.assign({}, options, ignore))
            }
          })
        })
    }
  },
  components: {
    SubtractAddModule,
    PanelItem
  }
})

import {mapGetters} from 'vuex'
import {confirm, closeModal, resolveRoute} from 'utils'
import ModalItem from 'components/HiModal/ModalItem'

import classes from './all-menus.styl'

export default require('./all-menus.pug')({
  name: 'hi-menus',
  data: () => ({
    classes
  }),
  computed: {
    ...mapGetters(['isEnterprise', 'rem', 'winHeight', 'merchantUrlPrefix',
      'coachAlias', 'isAdmin', 'isService', 'isOnlinePayment', 'checkIn']),
    height() {
      return Math.ceil(this.winHeight - 70 * this.rem) + 'px'
    },
    menus() {
      const {
        merchantUrlPrefix, isEnterprise,
        isAdmin, isService, checkIn, isOnlinePayment
      } = this

      const promotion = []

      promotion.push({
        icon: 'circle-computer',
        name: '微官网',
        link: merchantUrlPrefix + 'merchant-website/get-website-state'
      })

      if (!isEnterprise) {
        promotion.push({
          icon: 'circle-gift',
          name: '报名活动',
          link: merchantUrlPrefix + 'experience/list'
        })
      }

      if (isEnterprise || isAdmin) {
        promotion.push({
          icon: 'circle-speaker',
          name: '宣传秀',
          auth: true,
          link: merchantUrlPrefix + 'mobile/show/index'
        })
      }

      if (isEnterprise && !isService) {
        promotion.push({
          icon: 'circle-gift',
          name: '营销活动',
          link: '/marketing-activities'
        })
      }

      isAdmin && promotion.push({
        icon: 'circle-sales',
        name: '会员卡销售',
        auth: true,
        confirm: !isOnlinePayment,
        link: '/card-sales'
      })

      if (isEnterprise || isAdmin) {
        promotion.push({
          icon: 'circle-footprint',
          name: '访客管理',
          auth: true,
          link: merchantUrlPrefix + 'member-manage/visitors'
        })
      }

      if (isEnterprise && isOnlinePayment || isAdmin) {
        promotion.push({
          icon: 'manage-order',
          name: '订单管理',
          auth: true,
          link: merchantUrlPrefix + 'merchant/order-list'
        })
      }

      const memberService = [{
        icon: 'circle-people',
        name: '会员管理',
        link: merchantUrlPrefix + (isService ? 'service/search/member' : 'member-manage/member-list')
      }, {
        icon: 'circle-card',
        name: '会员卡管理',
        link: merchantUrlPrefix + (isService ? 'service/search/card' : 'mbrcardmanage/mbrcard-home')
      }]

      checkIn && memberService.push({
        icon: 'circle-checkin',
        name: '会员签到',
        link: merchantUrlPrefix + 'merchant-checkin/list'
      })

      memberService.push({
        icon: 'circle-booking',
        name: '预订管理',
        link: merchantUrlPrefix + 'merchantsubscribe/index'
      }, {
        icon: 'circle-calendar',
        name: '排期管理',
        link: merchantUrlPrefix + 'scheduling/index'
      }, {
        icon: 'circle-private',
        name: '私教管理',
        link: merchantUrlPrefix + 'private-manage/index'
      })

      const internalAffairs = [{
        icon: 'circle-books',
        name: '课程管理',
        link: merchantUrlPrefix + 'merchant-course/course-list'
      }, {
        icon: 'circle-coach',
        name: this.coachAlias + '管理',
        link: merchantUrlPrefix + 'merchant-coach/coach-list'
      }]

      isAdmin && internalAffairs.push({
        icon: 'circle-staff',
        name: '员工管理',
        link: merchantUrlPrefix + 'staff-manage/list'
      }, {
        icon: 'circle-trends',
        name: '数据分析',
        link: merchantUrlPrefix + 'statistics'
      }, {
        icon: 'circle-settings',
        name: '系统设置',
        link: merchantUrlPrefix + 'merchant-system/setup'
      }, {
        icon: 'notice',
        name: '会员须知',
        link: merchantUrlPrefix + 'member-notice/index'
      }, {
        icon: 'circle-house',
        name: '场馆信息',
        link: merchantUrlPrefix + 'merchant/merchant-info'
      })

      internalAffairs.push({
        icon: 'circle-business-card',
        name: '个人信息',
        link: '/personal-info'
      })

      return [{
        title: '营销销售',
        items: promotion
      }, {
        title: '会员服务',
        items: memberService
      }, {
        title: '内务管理',
        items: internalAffairs
      }]
    }
  },
  methods: {
    resolveItem(link, operate) {
      if (operate) {
        return confirm({
          tipText: '此功能需要开通在线支付后才能使用哦,赶紧去开通吧!',
          confirmText: '立即开通',
          confirm() {
            closeModal()
            location.href = this.merchantPrefix + 'systemsetting/wx-pay/pay-before-set/' + +new Date()
          }
        })
      }

      closeModal()
      resolveRoute(this.$router, link)
    }
  },
  components: {
    ModalItem
  }
})

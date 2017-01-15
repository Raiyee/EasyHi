import {mapGetters} from 'vuex'

import ModalItem from 'components/HiModal/ModalItem'

import classes from './all-menus.styl'

export default require('./all-menus.pug')({
  name: 'hi-menus',
  data: () => ({
    classes
  }),
  computed: {
    ...mapGetters(['isEnterprise', 'rem', 'winHeight', 'currentRole',
      'coachAlias', 'isAdmin', 'isService', 'isOnlinePayment', 'checkIn']),
    height() {
      return Math.ceil(this.winHeight - 70 * this.rem) + 'px'
    },
    menus() {
      const merchantUrlPrefix = '/'

      const {
        isEnterprise, currentRole,
        isAdmin, isService, checkIn, isOnlinePayment
      } = this

      const promotion = []

      if (!(isEnterprise && isService)) {
        promotion.push({
          icon: 'gift',
          name: (isEnterprise ? '营销' : '报名') + '活动',
          link: merchantUrlPrefix + (isEnterprise ? 'activity/home' : 'experience/list')
        })
      }

      promotion.push({
        icon: 'computer',
        name: '微官网',
        link: merchantUrlPrefix + 'merchant-website/get-website-state'
      })

      if (isEnterprise || isAdmin) {
        promotion.push({
          icon: 'speaker',
          name: '宣传秀',
          auth: true,
          link: merchantUrlPrefix + 'mobile/show/index'
        }, {
          icon: 'visitor',
          name: '访客管理',
          auth: true,
          link: merchantUrlPrefix + 'member-manage/visitors'
        })
      }

      if (isEnterprise && isOnlinePayment || isAdmin) {
        promotion.push({
          icon: 'order',
          name: '订单管理',
          auth: true,
          link: merchantUrlPrefix + 'merchant/order-list'
        })
      }

      const memberService = [{
        icon: 'public',
        name: '会员管理',
        link: merchantUrlPrefix +
        (currentRole === 'SERVICE' ? 'service/search/member' : 'member-manage/member-list')
      }, {
        icon: 'card',
        name: '会员卡管理',
        link: merchantUrlPrefix + (isService ? 'service/search/card' : 'mbrcardmanage/mbrcard-home')
      }]

      checkIn && memberService.push({
        icon: 'checkin',
        name: '会员签到',
        link: merchantUrlPrefix + 'merchant-checkin/list'
      })

      memberService.push({
        icon: 'booking',
        name: '预订管理',
        link: merchantUrlPrefix + 'merchantsubscribe/index'
      }, {
        icon: 'calendar',
        name: '排期管理',
        link: merchantUrlPrefix + 'scheduling/index'
      }, {
        icon: 'one-on-one',
        name: '私教管理',
        link: merchantUrlPrefix + 'private-manage/index'
      })

      const internalAffairs = [{
        icon: 'course',
        name: '课程管理',
        link: merchantUrlPrefix + 'merchant-course/course-list'
      }, {
        icon: 'teacher',
        name: this.coachAlias + '管理',
        link: merchantUrlPrefix + 'merchant-coach/coach-list'
      }]

      isAdmin && internalAffairs.push({
        icon: 'staff',
        name: '员工管理',
        link: merchantUrlPrefix + 'staff-manage/list'
      }, {
        icon: 'data-trends',
        name: '数据分析',
        link: merchantUrlPrefix + 'statistics'
      }, {
        icon: 'system-settings',
        name: '系统设置',
        link: merchantUrlPrefix + 'merchant-system/setup'
      }, {
        icon: 'notice',
        name: '会员须知',
        link: merchantUrlPrefix + 'member-notice/index'
      }, {
        icon: 'house',
        name: '场馆信息',
        link: merchantUrlPrefix + 'merchant/merchant-info'
      })

      internalAffairs.push({
        icon: 'business-card',
        name: '个人信息',
        link: merchantUrlPrefix + 'staff-info'
      })

      return [{
        title: '营销推广',
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
  components: {
    ModalItem
  }
})

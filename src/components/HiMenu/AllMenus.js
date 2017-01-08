import {mapGetters} from 'vuex'

import ModalItem from 'components/HiModal/ModalItem'

import classes from './all-menus.styl'

export default require('./all-menus.pug')({
  name: 'hi-menus',
  data: () => ({
    classes,
    menus: [{
      title: '营销推广',
      items: [{
        icon: 'gift',
        name: '营销活动'
      }, {
        icon: 'computer',
        name: '微官网'
      }, {
        icon: 'speaker',
        name: '宣传秀',
        auth: true
      }, {
        icon: 'visitor',
        name: '访客管理',
        auth: true
      }, {
        icon: 'order',
        name: '订单管理',
        auth: true
      }]
    }, {
      title: '会员服务',
      items: [{
        icon: 'public',
        name: '会员管理'
      }, {
        icon: 'card',
        name: '会员卡管理'
      }, {
        icon: 'checkin',
        name: '会员签到'
      }, {
        icon: 'booking',
        name: '预订管理'
      }, {
        icon: 'calendar',
        name: '排期管理'
      }, {
        icon: 'one-on-one',
        name: '私教管理'
      }]
    }, {
      title: '内务管理',
      items: [{
        icon: 'course',
        name: '课程管理'
      }, {
        icon: 'teacher',
        name: '教练管理'
      }, {
        icon: 'staff',
        name: '员工管理'
      }, {
        icon: 'data-trends',
        name: '数据分析'
      }, {
        icon: 'system-settings',
        name: '系统设置'
      }, {
        icon: 'notice',
        name: '会员须知'
      }, {
        icon: 'house',
        name: '场馆信息'
      }, {
        icon: 'business-card',
        name: '个人信息'
      }]
    }]
  }),
  computed: {
    ...mapGetters(['isEnterprise'])
  },
  components: {
    ModalItem
  }
})

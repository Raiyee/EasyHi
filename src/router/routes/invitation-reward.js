import {getters} from 'store'

import {ADMINS, STAFFS_S, MEMBER} from 'utils'

export default [{
  path: '/invitation-reward',
  name: 'invitationReward',
  component: () => import('views/InvitationReward'),
  meta: {
    auth: () => [...getters.isEnterprise ? ADMINS : STAFFS_S, MEMBER],
    bg: false,
    init: () => getters.isStaffS
      ? '/invite/get-invitation-with-statistic' : '/membercenter/query-member-invitee-detail'
  }
}, {
  path: '/invitation-reward/setting',
  name: 'rewardSetting',
  component: () => import('views/InvitationReward/RewardSetting'),
  meta: {
    auth: () => getters.isEnterprise ? ADMINS : STAFFS_S,
    init: '/invite/get-invitation-info'
  }
}, {
  path: '/invitation-reward/inviters',
  name: 'inviters',
  component: () => import('views/InvitationReward/Inviters'),
  meta: {
    auth: () => getters.isEnterprise ? ADMINS : STAFFS_S,
    init: '/invite/query-inviter-statistics'
  }
}, {
  path: '/invitation-reward/inviter/:userId(\\d+)',
  name: 'inviter-detail',
  component: () => import('views/InvitationReward/InviterDetail'),
  meta: {
    auth: () => getters.isEnterprise ? ADMINS : STAFFS_S,
    bg: false,
    init: to => `/invite/query-invitee-statistics/${to.params.userId}`
  },
  props: true
}]

import {ROLES} from 'utils'

// eslint-disable-next-line no-unused-vars
const {ADVISOR, COACH, MERCHANT, MEMBER, SERVICE, VISITOR} = ROLES

export default [{
  path: '/member-index',
  name: 'memberIndex',
  component: () => System.import('views/MemberIndex'),
  alias: '/visitor-index',
  meta: {
    auth: [MEMBER, VISITOR],
    init: {
      url: '/member-index',
      restore: false
    }
  }
}, {
  path: '/member-info',
  name: 'memberInfo',
  component: () => System.import('views/MemberIndex/MemberInfo'),
  meta: {
    auth: MEMBER,
    init: {
      url: '/member-info'
    }
  }
}, {
  path: '/member-message',
  name: 'memberMessage',
  component: () => System.import('views/MemberIndex/MemberMessage'),
  meta: {
    auth: MEMBER,
    init: {
      url: '/member-message'
    }
  }
}, {
  path: '/member-subscription',
  name: 'memberSubscription',
  component: () => System.import('views/MemberIndex/MemberSubscription'),
  meta: {
    auth: MEMBER,
    init: {
      url: '/member-subscriptions'
    }
  }
}]

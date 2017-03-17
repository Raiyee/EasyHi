import {CONSUMERS, STAFFS_S} from 'utils'

export default [{
  path: `/member-index`,
  name: 'memberIndex',
  component: () => import('views/MemberIndex'),
  alias: '/visitor-index',
  meta: {
    auth: CONSUMERS,
    init: {
      type: 'get',
      url: '/membercenter/query-member-detail'
    }
  }
}, {
  path: '/member-message',
  name: 'memberMessage',
  component: () => import('views/MemberIndex/MemberMessage'),
  meta: {
    auth: CONSUMERS,
    init: '/member-message'
  }
}, {
  path: '/member-subscription',
  name: 'memberSubscription',
  component: () => import('views/MemberIndex/MemberSubscription'),
  meta: {
    auth: CONSUMERS,
    init: '/member-subscriptions'
  }
}, {
  path: '/member-card',
  name: 'memberCard',
  component: () => import('views/MemberIndex/MemberCard'),
  meta: {
    auth: CONSUMERS,
    init: '/member-center/select-member-cards'
  }
}, {
  path: '/member-care/member-care-template/:memberId',
  name: 'memberCareTemplate',
  component: () => import('views/MemberIndex/MemberCare/MemberCareTemplate'),
  meta: {
    auth: STAFFS_S
  }
}, {
  path: '/member-voucher',
  name: 'memberVoucher',
  component: () => import('views/MemberIndex/MemberVoucher'),
  meta: {
    auth: CONSUMERS,
    init: '/cash-coupon/query-personal-coupons'
  }
}, {
  path: '/activities',
  name: 'memberActivities',
  component: () => import('views/MemberIndex/MemberActivities'),
  meta: {
    menuShow: false,
    init: '/activity/query-activity-list'
  }
}, {
  path: '/extend-card/:mbrCardId(\\d+)',
  name: 'extendCard',
  component: () => import('views/MemberIndex/MemberCard/ExtendCard'),
  meta: {
    auth: CONSUMERS,
    init: to => `/renew-mbrcard/init-data/${to.params.mbrCardId}`
  }
}, {
  path: '/add-review/:subscribeId(\\d+)',
  name: 'addReview',
  component: () => import('views/MemberIndex/MemberReview/AddReview'),
  meta: {
    init: {
      url: to => `/comment/init-comment/${to.params.subscribeId}`
    }
  }
}, {
  path: '/member-reviews',
  name: 'memberReviews',
  component: () => import('views/MemberIndex/MemberReview'),
  meta: {
    init: '/comment/query-comments'
  }
}, {
  path: '/member-review/:reviewId(\\d+)',
  name: 'memberReview',
  component: () => System.import('views/MemberIndex/MemberReview/ReviewDetail'),
  meta: {
    init: {
      url: to => `/comment/get-comment/${to.params.reviewId}`
    }
  }
}]

export default {
  path: '/member-subscribe/:courseTypeId(\\d+)?/:date(\\d{4}-\\d{2}-\\d{2})?',
  name: 'memberSubscribe',
  component: () => System.import('views/MemberSubscribe'),
  meta: {
    init: {
      url: '/get-schedules'
    },
    keepAlive: false
  }
}

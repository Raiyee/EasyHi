export default {
  path: '/subscribe-schedule/:courseTypeId(\\d+)?/:date(\\d{4}-\\d{2}-\\d{2})?',
  name: 'subscribeSchedule',
  component: () => System.import('views/SubscribeSchedule'),
  meta: {
    init: {
      url: '/get-schedules'
    },
    keepAlive: false
  }
}

export default [{
  path: '/subscribe-index/:courseTypeId(\\d+)?/:date(\\d{4}-\\d{2}-\\d{2})?',
  name: 'subscribeIndex',
  component: () => System.import('views/SubscribeIndex'),
  meta: {
    init: {
      url: '/subscribe-index'
    },
    keepAlive: false
  }
}]

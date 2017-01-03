export default [{
  path: '/dynamic',
  name: 'dynamic',
  component: () => System.import('views/_Test/Dynamic'),
  meta: {
    init: {
      url: '/dynamic'
    }
  }
}, {
  path: '/chart',
  name: 'chart',
  component: () => System.import('views/_Test/Chart')
}, {
  path: '/picker',
  component: () => System.import('views/_Test/Picker')
}, {
  path: '/modal',
  component: () => System.import('views/_Test/Modal')
}]

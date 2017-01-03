export default [{
  path: '/dynamic',
  name: 'dynamic',
  component: () => System.import('views/_Dynamic'),
  meta: {
    init: {
      url: '/dynamic'
    }
  }
}, {
  path: '/chart',
  name: 'chart',
  component: () => System.import('views/_Chart')
}, {
  path: '/picker',
  component: () => System.import('views/_Picker')
}, {
  path: '/modal',
  component: () => System.import('views/_Modal')
}]

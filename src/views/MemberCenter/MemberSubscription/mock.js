import Mock from 'mockjs'

Mock.mock(/\/member-subscriptions$/, () => Mock.mock({'tabArray|7-10': [{
  tabName: '@cword(3,12)课'
}]}))

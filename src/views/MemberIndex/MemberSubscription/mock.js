import Mock from 'mockjs'

Mock.mock(/\/member-subscriptions$/, {'items|7-10': [{
  text: '@cword(3,12)课'
}]})

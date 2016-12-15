import Mock, {Random} from 'mockjs'

import {randomImg, randomMobile} from 'utils'

Mock.mock(/\/member-subscriptions$/, () => Mock.mock({'tabArray|1-10':[{
  tabName: '@cword(3,12)课'
}]}))

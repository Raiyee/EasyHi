import Mock, {Random} from 'mockjs'

import {randomImg, randomMobile} from 'utils'

Mock.mock(/\/member-subscriptions$/, () => {
  let courseTypeId = 1001
  return Mock.mock({'tagArray|1-10':[{
    courseTypeId: courseTypeId++,
    courseTypeName: '@cword(3,25)课'
  }]})
})

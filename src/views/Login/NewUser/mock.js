import Mock, {Random} from 'mockjs'

import {randomId} from 'utils'

Mock.mock(/\/invite\/initialize-invitee-data\/\d+$/, () => {
  const voucherType = Random.boolean()

  return Mock.mock({
    memberName: '@cname',
    attentionUrl: 'https://www.qq.com',
    inviteeRewardId: voucherType ? randomId() : '',
    inviteeRewardContent: '@cTitle'
  })
})

Mock.mock(/\/invite\/accept-the-prize$/, () => {
  return {
    code: Random.pick('ok', 'error', 'accepted'),
    desc: Random.boolean() ? '成功' : '失败'
  }
})

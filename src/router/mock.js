import Mock, {Random} from 'mockjs'

import {PERMISSIONS, VISITOR, getItem} from 'utils'

const TCODES = [12345678910]

Mock.mock(/\/initialize\/get-base-data$/, ({url}) => {
  const mobile = getItem('mobile')

  let tcode = /center\/([^/]+)\/initialize/.exec(url)

  tcode = tcode && tcode[1]

  const {roles, currentRole} = mobile && PERMISSIONS.find(({mobiles}) => mobiles.includes(+mobile)) ||
  {roles: [VISITOR], currentRole: VISITOR}

  return {
    error: tcode == null || TCODES.includes(+tcode) ? '' : '未找到符合的商户，请确认 url 是否正确！',
    roles,
    currentRole,
    mobile,
    theme: Random.pick('blue', 'green', 'purple', 'red'),
    merchantName: Random.ctitle(),
    coachAlias: Random.pick(['教练', '老师', '教官', '导师'])
  }
})

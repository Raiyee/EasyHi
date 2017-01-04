import Mock, {Random} from 'mockjs'

import {PERMISSIONS, ROLES, getItem} from 'utils'

const {VISITOR} = ROLES

const TCODES = [12345678910]

Mock.mock(/\/initialize\/get-base-data$/, ({url}) => {
  const local = getItem('ENV_KEY-default')
  const mobile = local && local.value.mobile
  let tcode = /center\/([^/]+)\/initialize/.exec(url)

  tcode = tcode && tcode[1]

  const {roles, currentRole} = PERMISSIONS.find(({mobiles}) => mobiles.includes(+mobile)) ||
  {roles: [VISITOR], currentRole: VISITOR}

  return {
    error: tcode == null || TCODES.includes(+tcode) ? '' : '未找到符合的商户，请确认 url 是否正确！',
    roles,
    currentRole,
    theme: Random.pick('blue', 'green', 'purple', 'red'),
    merchantName: Random.ctitle(),
    coachAlias: Random.pick(['教练', '老师', '教官', '导师'])
  }
})

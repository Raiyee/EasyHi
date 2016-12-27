import Mock, {Random} from 'mockjs'

import {PERMISSIONS, ROLES} from 'utils'

const {MEMBER, VISITOR} = ROLES

const TCODES = ['12345678910']

Mock.mock(/\/initialize$/, ({body}) => {
  const {tcode, mobile} = JSON.parse(body)

  const {roles, currentRole} = PERMISSIONS.find(({mobiles, roles}) => mobiles.includes(+mobile)) || {
    roles: [MEMBER],
    currentRole: MEMBER
  } || {roles: [VISITOR], currentRole: VISITOR}

  return {
    error: tcode == null || TCODES.includes(tcode) ? '' : '未找到符合的商户，请确认 url 是否正确！',
    roles,
    currentRole,
    coachAlias: Random.pick(['教练', '老师', '教官', '导师'])
  }
})

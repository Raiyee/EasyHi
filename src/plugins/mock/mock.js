import {mock, Random} from 'mockjs'

import {PERMISSIONS, VISITOR, getItem, randomImg, randomMobile} from 'utils'

const TCODES = [12345678910]

mock(/\/initialize\/get-base-data$/, ({url}) => {
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
    isEnterprise: Random.boolean(),
    style: Random.boolean(),
    theme: Random.pick('blue', 'green', 'purple', 'red', 'navy', Random.color()),
    merchantName: Random.ctitle(),
    merchantLogo: randomImg(),
    serviceMobile: randomMobile(),
    coachAlias: Random.pick(['教练', '老师', '教官', '导师']),
    checkIn: Random.boolean(),
    isOnlinePayment: Random.boolean(),
    sceneUrlPrefix: Random.url('http'),
    oauthUrlTemplate: Random.url()
  }
})

mock(/\/mobile-show\/show\/center/, () => {
})

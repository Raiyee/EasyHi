import {mock, Random} from 'mockjs'

import {randomImg} from 'utils'

mock(/\/common\/personal-center-info\/query$/, () => {
  const address = Random.county(true)
  const addressArr = address.split(' ')

  return mock({
    portrait: randomImg(60, 60),
    name: '@cname',
    gender: '@boolean',
    birthday: '@date(yyyy-MM-dd)',
    profile: '@cparagraph(1, 3)',
    address,
    province: addressArr[0],
    city: addressArr[1],
    district: addressArr[2],
    qrcodeUrl: '@url'
  })
})

mock(/\/common\/personal-center-info\/update$/, () => Random.boolean() ? {
  code: '0',
  desc: '保存成功!'
} : {
  code: '1',
  desc: '保存失败！'
})

mock(/\/common\/personal-center-info\/validate-mobile/, () => Random.boolean() ? {
  code: '0',
  data: Random.integer(1, 60)
} : {
  code: '1',
  desc: '验证码发送失败！'
})

mock(/\/common\/personal-center-info\/confirm-mobile/, () => Random.boolean() ? {
  code: '0'
} : {
  code: '1',
  desc: '验证码已失效'
})

mock(/\/membercenter\/log-out/, ({
  code: 0
}))

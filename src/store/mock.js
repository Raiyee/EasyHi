import Mock from 'mockjs'

import {tcode} from 'utils'

const TCODES = [12345678910]

Mock.mock(/\/initialize$/, ({body}) => {
  return {
    error: tcode == null || TCODES.includes(+JSON.parse(body).tcode) ? '' : '未找到符合的商户，请确认 url 是否正确！'
  }
})

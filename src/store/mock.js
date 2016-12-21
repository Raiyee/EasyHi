import Mock from 'mockjs'

const TCODES = [12345678910]
const VALID_BASE = TCODES.map(tcode => `/yoga-vision/${tcode}`)

Mock.mock(/\/initialize$/, ({body}) => {
  return {
    error: __DEV__ || VALID_BASE.includes(JSON.parse(body).base) ? '' : '未找到符合的商户，请确认 url 是否正确！'
  }
})

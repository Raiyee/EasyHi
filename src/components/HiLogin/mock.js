import Mock from 'mockjs'

import {getItem, setItem, randomImg, imgPath, MEMBER, PERMISSIONS} from 'utils'

const Random = Mock.Random

const VERIFICATION = 'VERIFICATION'
const correctCode = 4567
const captchaCache = getItem(VERIFICATION) || {}

const minusTimeLint = verification => {
  const intervalId = setInterval(() => {
    verification.timeLimit ? --verification.timeLimit : clearInterval(intervalId)
    setItem(VERIFICATION, captchaCache)
  }, 1000)
  return intervalId
}

Mock.mock(/\/send-authc-captcha\/\d+$/, ({url}) => {
  const mobile = url.match(/\/send-authc-captcha\/(\d+)/)[1]

  let verification = captchaCache[mobile]
  let timeLimit

  if (verification && (timeLimit = verification.timeLimit)) return minusTimeLint(verification) && timeLimit

  verification = captchaCache[mobile] = {
    code: Random.natural(1000, 9999),
    timeLimit: 60
  }

  return minusTimeLint(verification) && verification.timeLimit
})

Mock.mock(/\/get-captcha\?t=\d+/, () => {
  return imgPath(randomImg(120, 30, Random.integer()))
})

Mock.mock(/\/verifyCode$/, req => {
  const {verificationCode, mobile} = JSON.parse(req.body)
  const verification = captchaCache[mobile]

  if (!verification) {
    return {
      error: '请先获取验证码!'
    }
  }

  const correctVerificationCode = verification.code
  const correct = [correctCode, correctVerificationCode].includes(+verificationCode) || Random.boolean()

  const {roles, currentRole} = PERMISSIONS.find(({mobiles}) => mobiles.includes(+mobile)) || {
    roles: [MEMBER],
    currentRole: MEMBER
  }

  return {
    error: !correct && Random.cword(5, 12),
    roles,
    currentRole
  }
})

Mock.mock(/\/login$/, ({
  code: 'success'
}))

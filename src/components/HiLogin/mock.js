import Mock from 'mockjs'

import {getItem, setItem, MEMBER, PERMISSIONS} from 'utils'

const Random = Mock.Random

const VERIFICATION = 'VERIFICATION'
const correctCode = 345678
const verificationCache = getItem(VERIFICATION) || {}

const minusTimeLint = verification => {
  const intervalId = setInterval(() => {
    verification.timeLimit ? --verification.timeLimit : clearInterval(intervalId)
    setItem(VERIFICATION, verificationCache)
  }, 1000)
  return intervalId
}

Mock.mock(/\/getVerificationCode$/, ({body}) => {
  const mobile = JSON.parse(body).mobile
  let verification = verificationCache[mobile]
  let timeLimit

  if (verification && (timeLimit = verification.timeLimit)) return minusTimeLint(verification) && timeLimit

  verification = verificationCache[mobile] = {
    code: Random.natural(100000, 999999),
    timeLimit: 60
  }

  return minusTimeLint(verification) && verification.timeLimit
})

Mock.mock(/\/verifyCode$/, req => {
  const {verificationCode, mobile} = JSON.parse(req.body)
  const verification = verificationCache[mobile]

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

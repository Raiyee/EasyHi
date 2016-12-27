import Mock from 'mockjs'

import {getItem, setItem, PERMISSIONS} from 'utils'
import {MEMBER, PERMISSION} from 'store/constants'

const Random = Mock.Random

const VERIFICATION = 'VERIFICATION'
const correctCode = 345678
const verificationCache = getItem(VERIFICATION) || setItem(VERIFICATION, {})

const minusTimeLint = (verification) => {
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

  const {roles, currentRole} = PERMISSIONS.find(({mobiles, roles}) => {
    const include = mobiles.includes(+mobile)
    if (include) {
      setItem(PERMISSION, {
        [PERMISSION.toLowerCase()]: {roles, currentRole: roles[0]}
      })
      return include
    }
  }) || {roles: [MEMBER], currentRole: MEMBER}

  return {
    error: !correct && Random.cword(5, 12),
    roles,
    currentRole
  }
})

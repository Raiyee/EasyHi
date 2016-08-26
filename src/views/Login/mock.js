import Mock from 'mockjs';

import {getItem, setItem} from 'utils';

const Random = Mock.Random;

const VERIFICATION = 'VERIFICATION';
const correctCode = '345678';
const verificationCache = getItem(VERIFICATION) || setItem(VERIFICATION, {});

const minusTimeLint = (verification) => {
  const intervalId = setInterval(() => {
    verification.timeLimit ? --verification.timeLimit : clearInterval(intervalId);
    setItem(VERIFICATION, verificationCache);
  }, 1000);
  return intervalId;
};

Mock.mock(/\/getVerificationCode/, ({body}) => {
  const mobile = JSON.parse(body).mobile;
  let verification = verificationCache[mobile];
  let timeLimit;

  if (verification && (timeLimit = verification.timeLimit)) return minusTimeLint(verification) && timeLimit;

  verification = verificationCache[mobile] = {
    code: Random.natural(100000, 999999),
    timeLimit: 60
  };

  return minusTimeLint(verification) && verification.timeLimit;
});

Mock.mock(/\/verifyCode$/, req => {
  const {verificationCode, mobile} = JSON.parse(req.body);
  const verification = verificationCache[mobile];

  if (!verification) {
    return {
      error: '请先获取验证码!'
    };
  }

  const correctVerificationCode = verification.code;
  return {
    error: [correctCode, correctVerificationCode].includes(verificationCode) ||
    Random.boolean() ? null : Random.cword(5, 12)
  };
});

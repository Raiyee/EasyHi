import Mock from 'mockjs';

const Random = Mock.Random;
Mock.mock(/\/verifyCode$/, (() => {
  const correctCode = '345678';
  const verificationCache = {};
  return req => {
    const {verificationCode} = JSON.parse(req.body);
    return verificationCache[verificationCode] ||
      (verificationCache[verificationCode] = {
        error: correctCode === verificationCode || Random.boolean() ? null : Random.cword(5, 12)
      });
  };
})());

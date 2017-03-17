import {mock, Random} from 'mockjs'

import {randomArr, randomImg} from 'utils'

// 现金券详情页请求 cash-coupon/coupon-detail/:voucherId
// 返回值{
//   voucherId:string,
//   voucherName:string,
//   presentedNum:number
// }

mock(/\/(cash-coupon\/coupon-detail)|(experience\/exp-detail)\/\d+/, ({url}) => mock({
  voucherName: '@ctitle',
  voucherValue: '@float(1, 1000, 0, 2)',
  voucherTimes: '@natural(1,100)',
  miniConsume: url.indexOf('cash') + 1 ? '@float(0, 8000, 0, 2)' : 0,
  presentedNum: '@natural(0, 1000)',
  applicableCourses: randomArr(5).map(() => Random.ctitle())
}))

// 删除此券 cash-coupon/delete-detail/:voucherId
mock(/\/(cash-coupon\/delete-coupon)|(expVoucher\/delete-expvoucher-template)/, () => {

})

// 赠送此券 cash-coupon/delete-detail/:voucherId
mock(/\/cash-coupon\/give-cash-coupon/, () => {

})

// 请求头 /cash-coupon/get-coupon-users
mock(/\/cash-coupon\/get-coupon-users/, () => {
  // 单个user的格式
  const user = {
    userId: '@id',
    userPortrait: randomImg(60), // 头像
    userName: '@cname',
    userMobile: '@id',
    hasCashVoucher: '@boolean', // 是否有现金券标识
    isVisitor: '@boolean', // 是否是访客标识
    userGender: '@boolean' // user性别
  }
  return {
    users: {
      A: randomArr(5).map(() => {
        return mock(user)
      }),
      C: randomArr(5).map(() => {
        return mock(user)
      })
    },
    // 两周到期user列表
    highlightUsers: randomArr(0).map(() => {
      return mock(user)
    })
  }
})

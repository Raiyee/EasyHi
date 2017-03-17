import {mock, Random} from 'mockjs'

import {getters} from 'store'

import {randomArr, randomId, randomImg, randomMobile} from 'utils'

mock(/(\/invite\/get-invitation-with-statistic)|(\/membercenter\/query-member-invitee-detail)/, ({url}) => {
  const isStaff = !url.includes('membercenter')

  return {
    inviterReward: Random.boolean() ? '' : randomArr(5).map(() => ({
      rewardThreshold: Random.natural(1, 10),
      rewardContent: randomArr(3, 1).map((val, index) => `${index + 1}、` + Random.csentence()).join('\n')
    })),
    inviteeRewardId: Random.boolean() ? '' : randomId(),
    inviteeRewardContent: Random.boolean() ? '' : Random.ctitle(),
    invitedNum: isStaff && Random.natural(1, 100),
    invitedMembershipNum: isStaff && Random.natural(1, 100),
    invitations: isStaff || randomArr(5).map(() => ({
      userMobile: randomMobile(),
      userName: Random.cname(),
      hasMbrCard: Random.boolean(),
      invitationState: Random.pick(0, 1, 2)
    })),
    qrcodeUrl: isStaff || Random.url('http')
  }
})

mock(/\/invite\/get-invitation-info/, () => {
  const {isEnterprise} = getters
  return {
    inviterReward: randomArr(5).map(() => ({
      rewardThreshold: Random.natural(0, 10),
      rewardContent: randomArr(3, 1).map((val, index) => `${index + 1}、` + Random.csentence()).join('\n')
    })),
    inviteeRewardContent: Random.boolean() && isEnterprise ? Random.ctitle() : randomArr(3, 1)
      .map((val, index) => `${index + 1}、` + Random.csentence()).join('\n'),
    inviteeRewardId: Random.boolean() && isEnterprise && randomId(),
    inviteeRewardDescription: `面值${Random.float(0, 1000, 0, 2)}元，适用于${randomArr(3, 1).map(() => Random.ctitle())}`,
    inviteeRewardTimes: Random.natural(1, 100),
    inviteeRewardExpiredType: Random.boolean(),
    inviteeRewardExpiredLimit: Random.natural(0, 100),
    inviteeRewardExpiredRange: [Random.date(), Random.date()]
  }
})

mock(/\/invite\/set-invitation/, () => {

})

mock(/\/invite\/query-inviter-statistics/, () => randomArr(10).map(() => ({
  userId: randomId(),
  memberName: Random.cname(),
  memberMobile: randomMobile(),
  memberGender: Random.boolean(),
  memberPortrait: randomImg(),
  invitedMembershipNum: Random.natural(0, 100),
  invitedNum: Random.natural(0, 1000)
})))

mock(/\/invite\/query-invitee-statistics\/\d+/, () => {
  return {
    memberName: Random.cname(),
    memberGender: Random.boolean(),
    memberPortrait: randomImg(),
    invitations: randomArr(30).map(() => ({
      userId: randomId(),
      userMobile: randomMobile(),
      userName: Random.cname(),
      userGender: Random.boolean(),
      userPortrait: randomImg(),
      hasMbrCard: Random.boolean(),
      isVisitor: Random.boolean(),
      invitationState: Random.pick(0, 1, 2)
    }))
  }
})

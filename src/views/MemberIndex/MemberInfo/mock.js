import Mock, {Random} from 'mockjs'

import {randomImg} from 'utils'

Mock.mock(/\/get-member-information$/, {
  memberId: '@id',
  userId: '@id',
  memberGender: '@boolean',
  memberName: '@cname',
  memberPortrait: randomImg(60, 60),
  memberBirthday: Random.date('yyyy-MM-dd'),
  memberProfile: Random.cparagraph(1, 3),
  memberAddress: Random.county(true)
})

Mock.mock(/\/saveMemberDetail$/, '保存成功!')

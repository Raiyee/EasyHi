import {randomArr, randomImg} from 'utils'
import Mock, {Random} from 'mockjs'

Mock.mock(/\/member-care-list/, () => {
  return {
    websitePrefix: 'http://test.w.easy-hi.com',
    memberList: randomArr(9).map((item, index) => {
      return {
        memberName: Random.cword(1, 5),
        userId: Random.id(11),
        birthday: Mock.mock('@date("yyyy.yy.y")'),
        beginTime: '2015.1.1',
        mbrDay: '2016.1.1',
        mobile: Random.id(11),
        sceneId: Random.cword(0, 1),
        icon: randomImg(60, 60, `${item}-${index}`),
        sex: 'M'
      }
    })
  }
})

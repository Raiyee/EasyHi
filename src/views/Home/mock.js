import {mock, Random} from 'mockjs'

mock(/\/member-index\/queryMemberIndex$/, () => {
  return {
    sloganTitle: Random.cname(),
    sloganContent: Random.cname(),
    mask: Random.boolean(),
    color: Random.boolean(),
    backImgs: ['', '']
  }
})

mock(/\/member-index\/save-index-info/, () => {})

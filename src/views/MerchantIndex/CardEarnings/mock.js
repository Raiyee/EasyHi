import {mock, Random} from 'mockjs'
import {randomArr} from 'utils'

// 卡收益明细uri /card/get-earnings
// 请求体
// {
//   currPage:1,
//   pageSize:20,
//   payType:"",
//   cardId:String,
//   init:boolean
// }

// {
//   earningsDetails:[{
//     earningsDuration: Random.time('yyyy-mm'),
//     totalEarnings: '@int(1,100)',
//     earningsDetail: {
//       memberName: '@cname',
//       memberMobile: '@mobile',
//       mbrCardId: '@id',
//       cardName: '@name',
//       logType: Random.pick(101, 102, 103, 104, 105),
//       payType: Random.pick(100, 101, 102, 103, 104, 105),
//       earnings: Random.float(100, 1000, 0, 2),
//       operatorTime: Random.time('yyyy-mm-dd'),
//     }
//   }],
// paging: {
//   currPage: 1,
//     pageSize: 20,
//     totalPage: 3
// },
// }

mock(/\/card\/get-earnings/, () => {
  const detailLog = {
    memberName: '@cname(3,5)',
    memberMobile: '@integer(10,11)',
    mbrCardId: '@id(11)',
    cardName: '@cword(5,10)',
    logType: Random.pick(101, 102, 103, 104, 105),
    payType: Random.pick(0, 1, 2, 3, 4, 5, 6),
    earnings: Random.float(100, 1000, 0, 2),
    operatorTime: Random.time('yyyy-mm-dd')
  }
  const earningsDetail = {
    earningsDuration: Random.time('yyyy-mm-dd'),
    totalEarnings: '@int(10000,1000000000)',
    earningsDetail: randomArr(5, 6).map(() => {
      return mock(detailLog)
    })
  }
  return {
    earningsDetails: randomArr(2, 3).map(() => {
      return mock(earningsDetail)
    }),
    paging: {
      currPage: 1,
      pageSize: 20,
      totalPage: 3
    },
    cardTypeList: ['1001', '1002', '1003', '1004', '1005'].map((val, index) => {
      return {
        cardTypeId: val,
        cardTypeName: Random.cword(5, 10),
        cards: randomArr(10).map(() => {
          return {
            cardId: Random.id(),
            cardNum: Random.integer(1, 100),
            cardName: Random.cword(5, 10)
          }
        })
      }
    })
  }
})

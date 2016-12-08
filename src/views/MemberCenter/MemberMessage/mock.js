import Mock from 'mockjs'
import moment from 'moment'

const Random = Mock.Random

Mock.mock(/\/membermessage$/, () => ({
  'messages': new Array(Random.integer(0, 5)).fill(0).map(() => {
    let date = moment().add(-Random.integer(0, 3), 'd').format('YYYY-MM-DD')
    return {
      date,
      msgs: new Array(Random.integer(1, 3)).fill(0).map(() => ({
        messageId: Random.character('number', 11),
        msgContent: Random.cword(5, 12),
        read: Random.boolean(),
        type: Random.character('SQYWBDXZGRVX'),
        createTime: +Random.date('T')
      }))
    }
  })
}))

import Mock from 'mockjs'
import moment from 'moment'

const Random = Mock.Random

const MESSAGE_TYPE = [
  '上课提醒',
  '取消预订消息',
  '预订消息',
  '温馨提示',
  '卡变更提醒',
  '到期提醒',
  '私教课时间修改',
  '中奖提醒',
  '购买成功提醒',
  '退款提醒']

Mock.mock(/\/membermessage$/, () => {
  let now = moment()
  return {
    messages: new Array(Random.integer(0, 5)).fill(0).map(() => {
      let date = now.add(-Random.integer(1, 3), 'd').format('YYYY-MM-DD')
      return {
        date,
        msgs: new Array(Random.integer(1, 3)).fill(0).map(() => ({
          messageId: Random.character('number', 11),
          messageContent: Random.cword(5, 12),
          read: Random.boolean(),
          type: MESSAGE_TYPE[Random.integer(0, MESSAGE_TYPE.length - 1)],
          createTime: +Random.date('T')
        }))
      }
    })
  }
})

import moment from 'moment'

const msgType = {
  'S': '上课提醒',
  'Q': '取消预订消息',
  'Y': '预订消息',
  'W': '温馨提示',
  'B': '卡变更提醒',
  'D': '到期提醒',
  'X': '私教课时间修改',
  'Z': '中奖提醒',
  'G': '购买成功提醒',
  'R': '退款提醒'
}
export const resetMsgType = type => { return msgType[type] || '消息提醒' }

export const resetMsg = msgs => {
  var messages = []
  msgs.forEach(function (msg) {
    var date = ''
    var currentTime = moment()
    var yesterday = currentTime.add(-1, 'days')
    var msgTime = moment({
      y: msg.hiDate.year,
      M: +msg.hiDate.month - 1,
      d: msg.hiDate.day
    })

    if (currentTime.isSame(msgTime, 'days')) {
      date = '今日'
    } else
      if (yesterday.isSame(msgTime, 'days')) {
        date = '昨日'
      } else {
        date = msgTime.format('YYYY.MM.DD')
      }
    messages.push({'date': date, 'messages': msg.userMessageDataList})
  })
  return messages
}

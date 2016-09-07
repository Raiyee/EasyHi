const messageType = {
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

export const reSetMsg = (msgs) => {
  var messages = []
  msgs.forEach(function (msg) {
    var date = ''
    var currentTime = new Date()
    var yesterday = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)

    var year = Number(msg.hiDate.year)
    var month = Number(msg.hiDate.month)
    var day = Number(msg.hiDate.day)

    if (currentTime.getFullYear() === year && (currentTime.getMonth() + 1) === month && currentTime.getDate() === day) {
      date = '今日'
    } else
      if (yesterday.getFullYear() === year && (yesterday.getMonth() + 1) === month && yesterday.getDate() === day) {
        date = '昨日'
      } else {
        date = year + '.' + month + '.' + day + ' ' + msg.hiDate.week
      }
    var messageDataList = reSetMessageTitle(msg.userMessageDataList)
    messages.push({'date': date, 'messages': messageDataList})
  })
  return messages
}

var reSetMessageTitle = (msgList) => {
  msgList.forEach(function (msg) {
    msg.type = messageType[msg.type] || '消息提醒'
  })

  return msgList
}

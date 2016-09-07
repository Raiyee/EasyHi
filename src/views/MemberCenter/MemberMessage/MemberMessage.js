
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
    var title = ''
    var msgType = msg.type
    if (msgType === 'S') {
      title = '上课提醒'
    } else if (msgType === 'Q') {
      title = '取消预订消息'
    } else if (msgType === 'Y') {
      title = '预订消息'
    } else if (msgType === 'W') {
      title = '温馨提示'
    } else if (msgType === 'B') {
      title = '卡变更提醒'
    } else if (msgType === 'D') {
      title = '到期提醒'
    } else if (msgType === 'X') {
      title = '私教课时间修改'
    } else if (msgType === 'Z') {
      title = '中奖提醒'
    } else if (msgType === 'G') {
      title = '购买成功提醒'
    } else if (msgType === 'R') {
      title = '退款提醒'
    } else {
      title = '消息提醒'
    }
    msg.type = title
  })
  return msgList
}

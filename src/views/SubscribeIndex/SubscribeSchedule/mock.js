import Mock, {Random} from 'mockjs'
import {randomArr, randomId} from 'utils'

Mock.mock(/\/member-subscribe$/, () => {
  return {
    code: '2',
    desc: '123',
    data: {}
  }
})

Mock.mock(/\/merchant-subscribe$/, () => {
  return {
    code: '0',
    desc: '123',
    data: {}
  }
})

Mock.mock(/\/subscribe\/subscribe-init$/, () => {
  return {
    'schedule': {
      'scheduleId': randomId(),
      'scheduleName': Random.cword(2, 7),
      'courseTypeId': '2001',
      'merchantId': '',
      'courseId': randomId(),
      'coachId': randomId(),
      'coachName': Random.cword(2, 7),
      'roomId': '',
      'roomName': '',
      'remark': '',
      'day': 3,
      'startTime': '2017-01-11 10:00:00',
      'endTime': '2017-01-11 11:00:00',
      'expectNum': 22,
      'realNum': 1,
      'offNum': 1,
      'createTime': 1483514267000,
      'updateTime': 1483770035000,
      'reservedNum': 0,
      'useTicket': false,
      'state': '1',
      'picUrl': 'people?w=20',
      'subscribeId': '',
      'hiDate': '',
      'userId': randomId(),
      'duration': 60,
      'memberName': Random.cword(2, 7),
      'sex': 'F',
      'userIds': '',
      'restId': '',
      'coachUrl': '12345678910/staff/199421714576527360.jpg',
      'courseTypeName': '',
      'subscribeType': '1',
      'scheduleDuration': '01.11 10:00-11:00',
      'canNotCancel': false,
      'noCancelHour': 0,
      'supplement': false,
      'subscribeNum': 0,
      'openSchedule': true,
      'privateSchedule': false,
      'enoughPeople': false,
      'outTime': false,
      'appointment': false,
      'arrangement': true,
      'expSchedule': false,
      'date': {
        'hourOfDay': 0,
        'minuteOfHour': 0,
        'secondOfMinute': 0,
        'millisOfSecond': 0,
        'weekyear': 2017,
        'yearOfEra': 2017,
        'yearOfCentury': 17,
        'centuryOfEra': 20,
        'millisOfDay': 0,
        'secondOfDay': 0,
        'minuteOfDay': 0,
        'monthOfYear': 1,
        'weekOfWeekyear': 2,
        'dayOfMonth': 11,
        'dayOfWeek': 3,
        'era': 1,
        'dayOfYear': 11,
        'year': 2017,
        'chronology': {
          'zone': {
            'uncachedZone': {
              'cachable': true,
              'fixed': false,
              'id': 'Asia/Shanghai'
            },
            'fixed': false,
            'id': 'Asia/Shanghai'
          }
        },
        'zone': {
          'uncachedZone': {
            'cachable': true,
            'fixed': false,
            'id': 'Asia/Shanghai'
          },
          'fixed': false,
          'id': 'Asia/Shanghai'
        },
        'millis': 1484064000000,
        'afterNow': true,
        'beforeNow': false,
        'equalNow': false
      }
    },
    'usefulMbrExpVoucher': randomArr(10, 20).map(() => {
      return {
        'expvoucherInstId': randomId(),
        'expvoucherId': randomId(),
        'availableTimes': '100',
        'vestigialTimes': Random.natural(1, 3),
        'endTime': Random.date('yyyy.MM.dd'),
        'expvoucherName': Random.cword(2, 10)
      }
    }),
    'uselessMbrExpVoucher': randomArr(1, 4).map(() => {
      return {
        'expvoucherInstId': randomId(),
        'expvoucherId': randomId(),
        'availableTimes': '100',
        'vestigialTimes': Random.natural(1, 3),
        'endTime': Random.date('yyyy.MM.dd'),
        'expvoucherName': Random.cword(2, 10),
        'isApply': Random.boolean(),
        'hasSurplus': Random.boolean()
      }
    }),
    'usefulMbrCards': randomArr(10, 20).map(() => {
      return {
        'mbrCardId': randomId(),
        'cardNo': Random.integer(9),
        'memberId': '',
        'isValueCard': Random.natural(0, 1),
        'cardTypeId': Random.natural(1001, 1004) + '',
        'cardId': randomId(),
        'effective': '2017-01-06 00:00:00.0',
        'expired': '2017.02.06',
        'expiredValue': 1,
        'expiredUnit': 'Y',
        'times': 100,
        'price': 0,
        'yearCardTag': Random.boolean(),
        'state': Random.boolean(),
        'remark': '',
        'orgCardId': '',
        'forbidden': '',
        'transfered': '',
        'visible': '',
        'availTimes': -2,
        'memberName': '',
        'cardName': Random.cword(2, 7),
        'payState': '',
        'realFee': '',
        'orgFee': '',
        'startTime': '2017.01.06',
        'endTime': Random.date('yyyy.MM.dd'),
        'orderId': '',
        'cardState': '',
        'channel': '',
        'goodsId': '',
        'activityId': '',
        'couponId': '',
        'usable': 1,
        'limitTimes': 0,
        'activationWay': '',
        'isLast': 0,
        'discount': 10,
        'deductTimes': 2,
        'selected': false,
        'yearUnit': false,
        'enoughAvailTimes': true,
        'enoughTimes': true,
        'personalCard': false,
        'inactiveState': false,
        'activeState': true,
        'yearCard': false,
        'meterCard': true,
        'monthUnit': true,
        'infiniteUnit': false
      }
    }
    ),
    'uselessMbrCards': randomArr(0).map((index) => {
      return {
        'mbrCardId': randomId(),
        'cardNo': Random.integer(9),
        'isValueCard': Random.natural(0, 1),
        'memberId': '',
        'cardTypeId': '1004',
        'cardId': randomId(),
        'effective': '2017-01-06 00:00:00.0',
        'expired': '2017.02.06',
        'expiredValue': 1,
        'expiredUnit': 'Y',
        'times': 100,
        'price': 0,
        'state': '1',
        'remark': '',
        'orgCardId': '',
        'forbidden': '',
        'transfered': '',
        'visible': '',
        'availTimes': Random.natural(2, 10),
        'memberName': '',
        'cardName': Random.cword(2, 7),
        'payState': '',
        'realFee': '',
        'orgFee': '',
        'startTime': '2017.01.06',
        'endTime': Random.date('yyyy.MM.dd'),
        'orderId': '',
        'cardState': '',
        'channel': '',
        'goodsId': '',
        'activityId': '',
        'couponId': '',
        'usable': 1,
        'limitTimes': 0,
        'activationWay': '',
        'isLast': 0,
        'discount': 8.8,
        'deductTimes': 2,
        'selected': false,
        'yearUnit': false,
        'enoughAvailTimes': true,
        'enoughTimes': true,
        'personalCard': false,
        'inactiveState': false,
        'activeState': true,
        'yearCard': false,
        'meterCard': true,
        'monthUnit': true,
        'infiniteUnit': false,
        'isApply': Random.boolean(),
        'hasSurplus': Random.boolean(),
        'isApplyPeriod ': Random.boolean()
      }
    }
    ),
    'subscribeData': {
      'subscribeId': '',
      'scheduleId': '200545973274015744',
      'scheduleName': '添加bug',
      'coachId': '199422177211197440',
      'startTime': '2017-01-11 10:00:00',
      'endTime': '2017-01-11 11:00:00',
      'userId': '12313123',
      'supplement': true,
      'memberSubscribe': false,
      'maxSubTimes': 10,
      'sumSubscribeNum': 0,
      'subscribeNum': 1,
      'operatorId': '',
      'sourceType': '3',
      'register': '',
      'cardPay': {
        'subscribeId': '',
        'payId': '',
        'payType': 'K',
        'times': 0,
        'discount': 0
      },
      'ticketPay': {
        'subscribeId': '',
        'payId': '',
        'payType': 'Q',
        'times': 0,
        'discount': 0
      },
      'ignoreUnCancelSchedule': false,
      'ignoreMbrCost': false,
      'ignoreMbrRemain': false,
      'ignoreScheduleRemain': false,
      'ignoreSubscribe': false
    }
  }
})

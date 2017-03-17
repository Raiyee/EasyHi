import {mock, Random} from 'mockjs'
import moment from 'moment'
import qs from 'qs'

import {DATE_FORMAT, HOUR_FORMAT, firstDayOfWeek, randomImg, randomId} from 'utils'

mock(/\/member-schedule\/get-subscriptions$/, (() => {
  const CACHE = {}
  let COURSE_TYPES

  return ({body}) => {
    let {courseTypeId} = qs.parse(body)

    const cache = courseTypeId && CACHE[courseTypeId]

    if (cache) return cache

    const today = moment()
    const firstDate = firstDayOfWeek(today, false)
    const scheduleDates = []
    const calendar = new Array(7 * Random.integer(1, 5)).fill(0).map((value, index) => {
      let date = firstDate.add(+!!index, 'd')
      const status = date.isBefore(today) ? Random.pick(0, 3) : Random.natural(0, 2)
      date = date.format(DATE_FORMAT);
      [1, 2].includes(status) && scheduleDates.push(date)
      return {
        date,
        status
      }
    })

    let courseTypes, courseType, subscribeType

    if (COURSE_TYPES) {
      courseType = COURSE_TYPES.find(courseType => courseType.courseTypeId === courseTypeId)
    }

    if (courseType) {
      subscribeType = courseType.subscribeType
      courseTypes = COURSE_TYPES
    } else {
      const length = Random.integer(2, 10)
      const activeIndex = Random.integer(0, length - 1)
      COURSE_TYPES = courseTypes = Random.range(0, length).map((value, index) => ({
        courseTypeId: index === activeIndex && courseTypeId ? courseTypeId : randomId(),
        courseTypeName: '@cword(2,5)课',
        subscribeType: Random.pick([1, 2])
      }))
      courseType = courseTypes[activeIndex]
      courseTypeId = courseType.courseTypeId
      subscribeType = courseType.subscribeType
    }

    const isPrivate = subscribeType === 2
    const schedules = {}
    const coaches = {}
    let startTime
    let endTime

    const getTimePeriod = time => {
      const hour = time.get('H')
      if (hour < 12) return 'morning'
      if (hour < 18) return 'afternoon'
      return 'evening'
    }

    scheduleDates.forEach((scheduleDate, dateIndex) => {
      startTime = moment(scheduleDate).add(Random.integer(6, 12), 'h')
      endTime = moment(scheduleDate).add(Random.integer(18, 22), 'h');
      (isPrivate ? coaches : schedules)[scheduleDate] = new Array(Random.integer(1, 5)).fill(0).map((value, index) => {
        const picUrl = randomImg(60, 60, courseTypeId + '-' + dateIndex + '-' + index)

        if (isPrivate) {
          const min060 = {}
          const min120 = {};

          [min060, min120].forEach(value => Object.assign(value, {
            morning: [],
            afternoon: [],
            evening: []
          }))

          const start = moment(startTime)

          while (start.isBefore(endTime)) {
            const timePeriod = getTimePeriod(start)
            min060[timePeriod].push(start.format(HOUR_FORMAT))
            // min120[timePeriod].push(moment(start).add(1, 'h').format(HOUR_FORMAT))
            start.add(20, 'm')
          }

          return {
            coachId: '@id',
            coachGender: '@boolean',
            coachName: '@cname(2,5)',
            coachPortrait: picUrl,
            times: [
              {
                minute: 60,
                data: min060
              }, {
                minute: 120,
                data: min120
              }
            ]
          }
        }

        return {
          coachId: randomId(),
          courseId: randomId(),
          courseImg: picUrl,
          bookedNum: '@integer(0,20)',
          coachName: '@cname(2,5)',
          scheduleId: '@id',
          scheduleRange: [+startTime.add(Random.integer(0, 120), 'm'), +startTime.add(Random.pick(60, 120), 'm')],
          scheduleName: '@cword(5,12)课',
          remainingNum: calendar.find(calendarItem => calendarItem.date === scheduleDate).status === 2
            ? 0 : '@integer(0,20)'
        }
      })
    })

    const schedulesData = mock({
      calendar,
      coaches,
      courseTypes,
      schedules
    })

    CACHE[courseTypeId] = schedulesData

    return schedulesData
  }
})())

mock(/\/member-subscribe\/private-schedule\/validation\/\d+/, () => ({
  code: Random.pick(0, 1, 2, 3),
  desc: Random.ctitle(),
  data: randomId()
}))

mock(/\/member-subscribe\/open-schedule\/validation\/\d+/, () => ({
  code: Random.pick(0),
  desc: Random.ctitle(),
  data: randomId()
}))

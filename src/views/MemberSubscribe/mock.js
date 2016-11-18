import Mock from 'mockjs'
import moment from 'moment'

import {DATE_FORMAT, HOUR_FORMAT, firstDayOfWeek, omitObj} from 'utils'

const Random = Mock.Random
Mock.mock(/\/get-schedules$/, (() => {
  const CACHE = {}
  let COURSE_TYPES

  return req => {
    let courseTypeId = JSON.parse(req.body).courseTypeId

    const cache = CACHE[courseTypeId]

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
      subscribeType = COURSE_TYPES.find(courseType => courseType.courseTypeId === courseTypeId).subscribeType
    } else {
      COURSE_TYPES = courseTypes = Random.range(0, Random.integer(2, 10)).map(() => ({
        courseTypeId: Random.id(),
        courseTypeName: '@cword(2,5)课',
        subscribeType: Random.pick([1, 2])
      }))
      courseType = courseTypes[0]
      courseTypeId = courseType.courseTypeId
      subscribeType = courseType.subscribeType
    }

    const isPrivate = subscribeType === 2
    let schedules = {}
    let coaches = {}
    let startTime
    let endTime

    const getTimePeriod = time => {
      let hour = time.get('H')
      if (hour < 12) return 'morning'
      if (hour < 18) return 'afternoon'
      return 'evening'
    }

    scheduleDates.forEach((scheduleDate, dateIndex) => {
      startTime = moment(scheduleDate).add(Random.integer(6, 12), 'h')
      endTime = moment(scheduleDate).add(Random.integer(18, 22), 'h');
      (isPrivate ? coaches : schedules)[scheduleDate] = new Array(Random.integer(1, 5)).fill(0).map((value, index) => {
        const picUrl = `60/60/?random-${dateIndex}-${index}`

        if (isPrivate) {
          const min060 = {}
          const min120 = {};

          [min060, min120].forEach(value => Object.assign(value, {
            morning: [],
            afternoon: [],
            evening: []
          }))

          let start = moment(startTime)

          while (start.isBefore(endTime)) {
            let timePeriod = getTimePeriod(start)
            min060[timePeriod].push(start.format(HOUR_FORMAT))
            // min120[timePeriod].push(moment(start).add(1, 'h').format(HOUR_FORMAT))
            start.add(20, 'm')
          }

          return {
            coachId: '@id',
            coachGender: '@boolean',
            coachName: '@cname(2,5)',
            coachPortrait: picUrl,
            min060,
            min120
          }
        }

        return {
          coursePicUrl: picUrl,
          scheduleBooked: '@integer(0,20)',
          scheduleCoach: '@cname(2,5)',
          scheduleId: '@id',
          scheduleStartTime: +startTime.add(Random.integer(0, 120), 'm'),
          scheduleEndTime: +startTime.add(Random.pick(60, 120), 'm'),
          scheduleName: '@cword(5,12)课',
          scheduleRemaining: calendar.find(calendarItem => calendarItem.date === scheduleDate).status === 2
            ? 0 : '@integer(0,20)'
        }
      })
    })

    const schedulesData = Mock.mock({
      calendar,
      coaches,
      courseTypes,
      schedules,
      subscribeType
    })

    CACHE[courseTypeId] = omitObj(schedulesData, 'courseTypes')

    return schedulesData
  }
})())

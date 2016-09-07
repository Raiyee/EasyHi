import Mock from 'mockjs'
import moment from 'moment'

import {DATE_FORMAT, firstDayOfWeek, omitObj} from 'utils'

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
    scheduleDates.forEach((scheduleDate, dateIndex) => {
      startTime = moment(scheduleDate).add(Random.integer(6 * 60, 9 * 60), 'm');
      (isPrivate ? coaches : schedules)[scheduleDate] = new Array(Random.integer(1, 5)).fill(0).map((value, index) => {
        const picUrl = `60-60-${dateIndex}-${index}`
        return isPrivate ? {
          coachId: '@id',
          coachGender: '@boolean',
          coachName: '@cname(2,5)',
          coachPortrait: picUrl,
          min060: {
            morning: [],
            afternoon: [],
            evening: []
          },
          min120: {}
        } : {
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

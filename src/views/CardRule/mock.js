import {mock, Random} from 'mockjs'

import pathToRegexp from 'path-to-regexp'

import {log, randomArr} from 'utils'

const cards = {
  1004: '储值卡'
}

const getCourses = (detailType, scheduling, selected, min) => {
  return randomArr(5, min).map(() => {
    return {
      itemId: '@id',
      itemName: scheduling ? '@cword(5,15)' : '@cname',
      itemNum: selected ? Random.natural(1, detailType ? 500 : 10) : '',
      selected
    }
  })
}

mock(/\/card-rule\/get-rules\/((stored-)?card)\/\d+$/, ({url}) => {
  const results = pathToRegexp('/card-rule/get-rules/:type(card|stored-card|course)/:id').exec(url)
  const type = results[1]
  const id = results[2]

  const detailType = type === 'stored-card'

  const schedulingCourses = getCourses(detailType, true, Random.boolean())
  const privateCourses = getCourses(detailType, false, Random.boolean())

  const title = cards[id] || Random.ctitle()

  return {
    rulesTitle: detailType ? `本馆${title}订课价格` : `${title}使用规则`,
    ruleDetails: randomArr(5, 1).map(() => {
      const subscribeType = Random.pick(1, 2)
      return mock({
        detailId: '@id',
        detailName: '@cword(3,5)课',
        detailType,
        subscribeType,
        ruleItems: subscribeType - 1 ? privateCourses : schedulingCourses
      })
    })
  }
})

mock(/\/card-rule\/set-rules\/((stored-)?card)\/\d+\/[0|1]$/, ({body}) => {
  log(JSON.parse(body))
})

mock(/\/card-rule\/get-all-rules\/((stored-)?card)\/\d+/, () => {
  const detailType = Random.boolean()

  return {
    available: {
      rulesTitle: '适用的课',
      ruleDetails: randomArr(5).map(() => {
        const subscribeType = Random.pick(1, 2)
        const schedulingCourses = getCourses(detailType, true, true, 1)
        const privateCourses = getCourses(detailType, false, true, 1)
        return mock({
          detailId: '@id',
          detailName: '@cword(3,5)课',
          detailType,
          subscribeType,
          ruleItems: subscribeType - 1 ? privateCourses : schedulingCourses
        })
      })
    },
    unavailable: {
      rulesTitle: '不适用的课',
      ruleDetails: randomArr(5).map(() => {
        const subscribeType = Random.pick(1, 2)
        const schedulingCourses = getCourses(detailType, true, false)
        const privateCourses = getCourses(detailType, false, false)
        return mock({
          detailId: '@id',
          detailName: '@cword(3,5)课',
          detailType,
          subscribeType,
          ruleItems: subscribeType - 1 ? privateCourses : schedulingCourses
        })
      })
    }
  }
})

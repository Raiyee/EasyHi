import {Random} from 'mockjs'

import {toNum} from 'utils'

export const randomArr = (max, min = 0) => new Array(Random.natural(min, max)).fill(undefined)

export const randomId = () => toNum(Random.id(), false)

export const randomImg = (w, h = w, random = 1, type = 'people') => Random.boolean()
  ? `${type}?w=${w}&h=${h}&random=${random}&txtclr=0000&overlay_color=0000` : ''

export const randomMobile = () => `1${Random.pick([3, 4, 5, 7, 8])}${Random.integer(100000000, 999999999)}`

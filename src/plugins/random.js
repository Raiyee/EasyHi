import {Random} from 'mockjs'

export const randomImg = (w, h = w, random = 1, type = 'people') =>
  `${type}?w=${w}&h=${h}&random=${random}&txtclr=0000&overlay_color=0000`

export const randomMobile = () => +`1${Random.pick([3, 4, 5, 7, 8])}${Random.integer(100000000, 999999999)}`

import {isObject} from './base'

export const isObjectLike = value => value != null && typeof value === 'object'

export const isEmptyObject = value => isObject(value) && Object.keys(value).length === 0

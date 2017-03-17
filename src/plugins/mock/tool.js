import qs from 'qs'

export const parseUrl = url => qs.parse(url.split('?')[1])

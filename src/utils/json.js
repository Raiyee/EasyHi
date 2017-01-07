import {isObject} from './base'
import {each} from './common'

class JsonLoop {
  constructor(json, level = Infinity) {
    this.json = json
    this.level = level
  }

  parse() {
    const level = this.level
    const json = this.json

    if (!level) return json

    const data = parseJSON(json)

    if (!isObject(data)) return data

    for (const [key, value] of Object.entries(data)) {
      data[key] = new JsonLoop(value, level - 1).parse()
    }

    return data
  }
}

export const parseJSON = data => {
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

export const parseJsonLoop = (data, level) => new JsonLoop(data, level).parse()

export const getItem = (key, level) => parseJsonLoop(localStorage.getItem(key), level)

export const setItem = (key, data) => localStorage.setItem(key, JSON.stringify(data)) || getItem(key)

export const setItems = val => {
  const result = []
  each(val, (data, key) => {
    result.push(setItem(key, data))
  })
  return setItems
}

export const deleteItem = key => delete localStorage[key]

export const isJsonSame = (x, y) => x === y || JSON.stringify(x) === JSON.stringify(y)

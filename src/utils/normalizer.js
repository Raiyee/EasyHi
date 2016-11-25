/**
 * Simple Normalizer
 *
 * @usage
 *   const normalizer = new Normalizer({
 *     key (item) {
 *       return item.uuid
 *     },
 *     value (item) {
 *       return item.value
 *     }
 *   })
 *
 *   // normalize:
 *   normalizer.normalize([{
 *     uuid: 1,
 *     value: 'a'
 *   }, {
 *     uuid: 2,
 *     value: 'b'
 *   }])
 *
 *   // output:
 *   {
 *     result: [1, 2],
 *     entities: {
 *       '1': 'a',
 *       '2': 'b'
 *     }
 *   }
 *
 *   // normalize:
 *   normalizer.normalize({
 *     uuid: 1,
 *     value: 'a'
 *   })
 *
 *   // output:
 *   {
 *     result: [1],
 *     entities: {
 *       '1': 'a'
 *     }
 *   }
 */

export default class Normalizer {
  constructor (options = {}) {
    Object.keys(options).forEach(key => {
      this[key] = options[key]
    })
  }

  key (item) {
    return item.id
  }

  value (item) {
    return item
  }

  normalize (items = []) {
    if (!Array.isArray(items)) {
      items = [items]
    }
    const result = []
    const entities = {}
    items.forEach(item => {
      const key = this.key(item)
      result.push(key)
      entities[key] = this.value(item)
    })
    return {
      result,
      entities
    }
  }
}

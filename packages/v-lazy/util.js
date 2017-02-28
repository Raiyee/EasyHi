import {inBrowser} from 'utils'

export function getBestSelectionFromSrcset(el, scale) {
  if (el.tagName !== 'IMG' || !el.getAttribute('data-srcset')) return

  let options = el.getAttribute('data-srcset')
  const container = el.parentNode
  const containerWidth = container.offsetWidth * scale

  let spaceIndex
  let tmpSrc
  let tmpWidth

  options = options.trim().split(',')

  const result = options.map(item => {
    item = item.trim()
    spaceIndex = item.lastIndexOf(' ')
    if (spaceIndex === -1) {
      tmpSrc = item
      tmpWidth = 999998
    } else {
      tmpSrc = item.substr(0, spaceIndex)
      tmpWidth = parseInt(item.substr(spaceIndex + 1, item.length - spaceIndex - 2), 10)
    }
    return [tmpWidth, tmpSrc]
  }).sort(function (a, b) {
    if (a[0] < b[0]) {
      return -1
    }
    if (a[0] > b[0]) {
      return 1
    }
    if (a[0] === b[0]) {
      if (b[1].indexOf('.webp', b[1].length - 5) !== -1) {
        return 1
      }
      if (a[1].indexOf('.webp', a[1].length - 5) !== -1) {
        return -1
      }
    }
    return 0
  })

  let bestSelectedSrc = ''
  let tmpOption

  for (let i = 0, len = result.length; i < len; i++) {
    tmpOption = result[i]
    if (tmpOption[0] >= containerWidth) {
      bestSelectedSrc = tmpOption[1]
      break
    }
  }

  return bestSelectedSrc
}

export const getDPR = (scale = 1) => inBrowser && window.devicePixelRatio || scale

export function supportWebp() {
  if (!inBrowser) return false

  let support = true
  const d = document

  try {
    let el = d.createElement('object')
    el.type = 'image/webp'
    el.innerHTML = '!'
    d.body.appendChild(el)
    support = !el.offsetWidth
    d.body.removeChild(el)
  } catch (err) {
    support = false
  }

  return support
}

export const loadImageAsync = (item, resolve, reject) => {
  let image = new Image()
  image.src = item.src

  image.onload = function () {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: image.src
    })
  }

  image.onerror = reject
}

const style = (el, prop) => typeof getComputedStyle !== 'undefined'
  ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop]

const overflow = el => style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x')

export const scrollParent = el => {
  if (!inBrowser) return

  if (!(el instanceof HTMLElement)) return window

  let parent = el

  while (parent) {
    if (parent === document.body || parent === document.documentElement) break

    if (!parent.parentNode) break

    if (/(scroll|auto)/.test(overflow(parent))) return parent

    parent = parent.parentNode
  }

  return window
}

import {inBrowser, one} from 'utils'

export function getDPR(scale = 1) {
  if (!inBrowser) return scale
  return window.devicePixelRatio || scale
}

export function supportWebp() {
  let support = true
  const {body} = document

  try {
    let el = document.createElement('object')
    el.type = 'image/webp'
    el.innerHTML = '!'
    body.appendChild(el)
    support = !el.offsetWidth
    body.removeChild(el)
  } catch (err) {
    support = false
  }

  return support
}

export const loadImageAsync = (item, resolve, reject) => {
  let image = new Image()
  image.src = item.src

  one(image, 'load', () => {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: item.src
    })
  })

  one(image, 'error', reject)
}

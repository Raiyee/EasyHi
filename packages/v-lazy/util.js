import {one, inBrowser} from 'utils'

export const getDPR = (scale = 1) => inBrowser ? window.devicePixelRatio || scale : scale

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

export function loadImageAsync(item, resolve, reject) {
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

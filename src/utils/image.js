import {isOdd} from './number'
import {one} from './dom'
import {
  EMPTY_IMG,
  DEFAULT_PORTRAIT,
  FEMALE_PORTRAIT_C,
  MALE_PORTRAIT_C,
  FEMALE_PORTRAIT_B,
  MALE_PORTRAIT_B,
  MAX_IMG_SIZE
} from './constants'
import {alert} from './modal'

export const imgPath = (path, defaultImg = DEFAULT_PORTRAIT) =>
  path ? /^(https?:\/|data:image)\//ig.test(path) ? path : IMG_PATH_PREFIX + path : defaultImg

export const portraitPath = (path, gender, isStaff) => imgPath(path, isStaff
  ? gender ? MALE_PORTRAIT_B : FEMALE_PORTRAIT_B : gender ? MALE_PORTRAIT_C : FEMALE_PORTRAIT_C)

export const drawImageFix = (function () {
  // Detects vertical squash in loaded image.
  // Fixes a bug which squash image vertically while drawing into canvas for some images.
  // This is a bug in iOS6 (and IOS7) devices. This function from https://github.com/stomita/ios-imagefile-megapixel
  // More: https://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios/#19485693
  function detectVerticalSquash(img) {
    const ih = img.naturalHeight
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = ih
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const data = ctx.getImageData(0, 0, 1, ih).data
    // search image edge pixel position in case it is squashed vertically.
    let sy = 0
    let ey = ih
    let py = ih
    while (py > sy) {
      if (data[(py - 1) * 4 + 3] === 0) {
        ey = py
      } else {
        sy = py
      }
      py = (ey + sy) >> 1
    }
    const ratio = py / ih
    return ratio || 1
  }

  return (ctx, img, ...args) => {
    // notice length of args could be changed
    args.length || args.push(0)
    isOdd(args) && args.push(args[args.length - 1])
    args.push(args.splice(args.length - 1)[0] / detectVerticalSquash(img))
    ctx.drawImage(img, ...args)
  }
}())

// eslint-disable-next-line max-params
export function resizeImg(url, success, error, imgType, width, height) {
  const img = new Image();

  /^https?:\/\//i.test(url) && (img.crossOrigin = 'Anonymous')

  one(img, 'load', function () {
    const imgWidth = this.width
    width = width || Math.min(imgWidth, 768)
    height = height || this.height * width / imgWidth
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    drawImageFix(canvas.getContext('2d'), img, 0, 0, width, height)
    const result = canvas.toDataURL(imgType || 'image/jpeg')
    if (result.length > MAX_IMG_SIZE) return alert('图片压缩后仍超过3M, 请更换后重试!')
    success && success.call(this, result)
  })

  one(img, 'error', error)

  img.src = url
  // make sure the load event fires for cached images too
  if (img.complete || img.complete === undefined) {
    img.src = EMPTY_IMG
    img.src = url
  }
}

export function resizeImgFile(file, success, error, width, height) {
  const fileType = file.type

  if (!/^image\//i.test(fileType)) return alert('请确保文件为图像类型')

  const reader = new FileReader()
  reader.readAsDataURL(file)
  one(reader, 'load', function () {
    resizeImg(this.result, success, error, fileType, width, height)
  })
}

const bubbleAndCancel = (bubbles, cancelable) => ({bubbles, cancelable})

export function triggerHTMLEvent(target, event, process) {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(event, true, true)
  process && process(e)
  target.dispatchEvent(e)
  return e
}

export function triggerMouseEvent(target, event, process) {
  const e = new MouseEvent(event, bubbleAndCancel(true, false))
  process && process(e)
  target.dispatchEvent(e)
  return e
}

export function triggerTouchEvent(target, event, process) {
  const e = new TouchEvent(event, bubbleAndCancel(true, true))
  process && process(e)
  target.dispatchEvent(e)
  return e
}

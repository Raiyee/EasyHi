import {isIOS} from './constants'

export const isWechat = navigator.userAgent.indexOf('MicroMessenger') !== -1

export const changeTitle = title => {
  document.title = title

  if (!isIOS) return

  const iframe = document.createElement('iframe')

  iframe.src = '//m.baidu.com/favicon.ico'
  iframe.style.display = 'none'

  const {body} = document

  iframe.onload = () => {
    setTimeout(() => {
      body.removeChild(iframe)
    }, 0)
  }
  body.appendChild(iframe)
}

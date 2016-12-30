import Vue from 'vue'

import {EMPTY_IMG} from './constants'

export const changeTitle = title => {
  document.title = title

  if (!Vue.util.isIOS) return

  const iframe = document.createElement('iframe')

  iframe.src = EMPTY_IMG
  iframe.style.display = 'none'

  const {body} = document

  iframe.onload = () => {
    setTimeout(() => {
      body.removeChild(iframe)
    }, 0)
  }
  body.appendChild(iframe)
}

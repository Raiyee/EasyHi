import {prototype as vueProp} from 'vue'
import qs from 'qs'

import {alert} from './modal'

const PAD_CHAR = '='
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const makeDOMException = function () {
  try {
    return new DOMException(DOMException.INVALID_CHARACTER_ERR)
  } catch (e) {
    const error = new Error('DOM Exception 5')
    error.code = error.number = 5
    error.name = error.description = 'INVALID_CHARACTER_ERR'
    error.toString = function () {
      return 'Error: ' + error.name + ': ' + error.message
    }
    return error
  }
}

const getByte = function (str, index) {
  const char = str.charCodeAt(index)
  if (char > 255) throw makeDOMException()
  return char
}

const getByte64 = function (str, index) {
  const charIndex = ALPHA.indexOf(str.charAt(index))
  if (charIndex === -1) throw makeDOMException()
  return charIndex
}

export const encode = str => {
  if (arguments.length !== 1) throw new SyntaxError('Not enough arguments')
  str = '' + str
  if (str.length === 0) return str
  const chars = []
  let index, charIndex
  const times = str.length - str.length % 3
  for (index = 0; index < times; index += 3) {
    charIndex = (getByte(str, index) << 16) | (getByte(str, index + 1) << 8) | getByte(str, index + 2)
    chars.push(ALPHA.charAt(charIndex >> 18))
    chars.push(ALPHA.charAt((charIndex >> 12) & 63))
    chars.push(ALPHA.charAt((charIndex >> 6) & 63))
    chars.push(ALPHA.charAt(charIndex & 63))
  }
  switch (str.length - times) {
    case 1:
      charIndex = getByte(str, index) << 16
      chars.push(ALPHA.charAt(charIndex >> 18) + ALPHA.charAt((charIndex >> 12) & 63) + PAD_CHAR + PAD_CHAR)
      break
    case 2:
      charIndex = (getByte(str, index) << 16) | (getByte(str, index + 1) << 8)
      chars.push(ALPHA.charAt(charIndex >> 18) + ALPHA.charAt((charIndex >> 12) & 63) +
        ALPHA.charAt((charIndex >> 6) & 63) + PAD_CHAR)
      break
  }
  return encodeURIComponent(chars.join(''))
}

export const decode = str => {
  str = '' + decodeURIComponent(str)
  let length = str.length
  if (length === 0) return str
  if (length % 4 !== 0) throw makeDOMException()

  let state = 0
  if (str.charAt(length - 1) === PAD_CHAR) {
    state = 1
    if (str.charAt(length - 2) === PAD_CHAR) state = 2
    length -= 4
  }
  const chars = []
  let index, charIndex
  for (index = 0; index < length; index += 4) {
    charIndex = (getByte64(str, index) << 18) | (getByte64(str, index + 1) << 12) |
      (getByte64(str, index + 2) << 6) | getByte64(str, index + 3)
    chars.push(String.fromCharCode(charIndex >> 16, (charIndex >> 8) & 255, charIndex & 255))
  }
  switch (state) {
    case 1:
      charIndex = (getByte64(str, index) << 18) | (getByte64(str, index + 1) << 12) | (getByte64(str, index + 2) << 6)
      chars.push(String.fromCharCode(charIndex >> 16, (charIndex >> 8) & 255))
      break
    case 2:
      charIndex = (getByte64(str, index) << 18) | (getByte64(str, index + 1) << 12)
      chars.push(String.fromCharCode(charIndex >> 16))
      break
  }
  return chars.join('')
}

const constructTransfer = (targetUrl, customTransferPath) => customTransferPath + '?goto=' + encode(targetUrl)

export const ALL_JS_API_LIST = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
  'onMenuShareQZone', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice',
  'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage',
  'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu',
  'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode',
  'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']

export const initWxJs = (jsApiList = ALL_JS_API_LIST, force) => {
  return vueProp.$wx && !force
    ? new Promise(resolve => resolve())
    : import('weixin-js-sdk')
      .then(wx => vueProp.$http.post(`/mobile-show/show/center/${vueProp.$util.tcode}/initWxJs`,
        qs.stringify({
          url: location.href.split('#')[0]
        })).then(({data}) => {
          wx.config({
            ...data,
            jsApiList
          })

          vueProp.$wx = wx

          return new Promise((resolve, reject) => {
            wx.ready(resolve)
            wx.error(reject)
          })
        }))
}

export const payByAliOrUnipay = (orderPayString, customTransferPath) => {
  location.href = typeof WeixinJSBridge === 'undefined'
    ? orderPayString : constructTransfer(orderPayString, customTransferPath)
}

export const wechatPay = (payInfo, success, fail, jsApiList, force) => initWxJs(jsApiList, force)
  .then(() => vueProp.$wx.chooseWXPay({
    ...payInfo,
    success,
    fail
  }))

export const payByWechat = (orderPayString, success, fail, jsApiList, force) => {
  const payInfo = JSON.parse(orderPayString)

  if (typeof WeixinJSBridge === 'undefined') return alert('请在微信中使用！')

  vueProp.$wx ? wechatPay(payInfo, success, fail, jsApiList, force) : window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      payInfo,
      result => result.err_msg === 'get_brand_wcpay_request:ok'
        ? success && success(result) : fail && fail(result)
    )
}

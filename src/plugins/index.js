import './components'
import './directives'
import './filters'
import './http'
import './lazyload'
import './validate'

if (__MOCK__) {
  require('./mock')
  __DEV__ || require('utils').warn('Notice: you are using mock server!')
}

if (__TEST__) import('vconsole')

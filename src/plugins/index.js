import './components'
import './directives'
import './filters'
import './http'
import './lazyload'

if (__MOCK__) require('./mock')

if (!__DEV__) System.import('vconsole')

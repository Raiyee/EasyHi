import './components'
import './directives'
import './filters'
import './http'
import './lazyload'

__MOCK__ && require('./mock')

__DEV__ || System.import('vconsole')

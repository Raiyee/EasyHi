import './components'
import './directives'
import './filters'
import './http'

__MOCK__ && require('./mock')

__DEV__ || require('vconsole')

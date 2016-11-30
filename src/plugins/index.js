import './components'
import './directives'
import './filters'
import './http'

// TODO should inject mock or vconsole in specific environment or when using argument `mock`
import './mock'

__DEV__ || require('vconsole')

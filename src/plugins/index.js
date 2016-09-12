import './directives'
import './filters'
import './vue-resource'
import './vue-touch'

// TODO should inject mock or vconsole in specific environment or when using argument `mock`
import './mock'

__DEV__ || require('vconsole')

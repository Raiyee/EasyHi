import 'styles/bootstrap'
import 'styles/app'

const resolveEntry = () => System.import('./entry')

typeof Object.assign === 'function' ? resolveEntry() : System.import('core-js/shim').then(resolveEntry)

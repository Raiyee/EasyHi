import 'styles/bootstrap'
import 'styles/app'

const resolveEntry = () => import('./entry')

typeof Object.entries === 'function' ? resolveEntry() : import('core-js/shim').then(resolveEntry)

location.protocol === 'https:' && navigator.serviceWorker && navigator.serviceWorker.register('/service-worker.js')

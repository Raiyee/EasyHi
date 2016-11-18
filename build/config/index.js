import fs from 'fs'
import _debug from 'debug'
import config, {env} from './_base'

const debug = _debug('koa:config')
debug('Create configuration.')
debug(`Apply environment overrides for NODE_ENV "${env}".`)

// Check if the file exists before attempting to require it, this
// way we can provide better error reporting that overrides
// weren't applied simply because the file didn't exist.
const overridesFilename = `_${env}`
let hasOverridesFile
try {
  fs.lstatSync(`${__dirname}/${overridesFilename}.js`)
  hasOverridesFile = true
} catch (e) {
  // debug(e)
}

// Overrides file exists, so we can attempt to require it.
// We intentionally don't wrap this in a try/catch as we want
// the Node process to exit if an error occurs.
let overrides
if (hasOverridesFile) {
  overrides = require(`./${overridesFilename}`)(config)
} else {
  debug(`No configuration overrides found for NODE_ENV "${env}"`)
}

export default {...config, ...overrides}

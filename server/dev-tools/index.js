import webpack from './webpack'
import {server_mock} from '../config' // eslint-disable-line camelcase

export default app => {
  webpack(app)

  if (server_mock) { // eslint-disable-line camelcase
  }
}

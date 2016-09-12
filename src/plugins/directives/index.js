import {inject} from '../utils'

export default inject(require.context('.', false, /\.js$/), 'directive')

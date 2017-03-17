import HiOperatorMenu from 'components/HiMenu/OperatorMenu'

import {log} from 'utils'

export default require('./index.pug')({
  methods: {
    updateItem() {
      log('update operator')
    },
    deleteItem() {
      log('delete operator')
    }
  },
  components: {
    HiOperatorMenu
  }
})

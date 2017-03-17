import ModalItem from 'components/HiModal/ModalItem'
import HiVoucher from 'components/HiVoucher'

import {REQUIRED_ARRAY} from 'utils'

import classes from './new-cash-vouchers.styl'

export default require('./new-cash-vouchers.pug')({
  name: 'alert-cash-voucher',
  props: {
    newCashVouchers: REQUIRED_ARRAY
  },
  data: () => ({classes}),
  components: {
    ModalItem,
    HiVoucher
  }
})

import classes from './card.styl'

import {CARD} from 'flow/card'

export default require('./card.pug')({
  props: {
    card: {
      type: Object,
      require: true,
      validator: (card: CARD) => true
    },
    selected: true,
    selectable: true,
    unavailable: true
  },
  data() {
    return {
      classes
    }
  }
})

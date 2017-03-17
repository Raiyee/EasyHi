import CardName from 'components/HiCard/CardName'
import MbrCard from 'components/HiCard/MbrCard'
import MchCard from 'components/HiCard/MchCard'

import classes from './index.styl'

export default require('./index.pug')({
  name: 'card-test',
  data() {
    return {
      classes,
      ...this.$route.meta.data
    }
  },
  components: {
    CardName,
    MbrCard,
    MchCard
  }
})

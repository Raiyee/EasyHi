import {mapGetters} from 'vuex'

import NoItem from 'components/NoItem'

export default require('./index.pug')({
  computed: {
    ...mapGetters(['initialized'])
  },
  components: {
    NoItem
  }
})

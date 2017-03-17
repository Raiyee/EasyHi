import HiPicker from 'components/HiPicker'

import {log} from 'utils'

export default require('./index.pug')({
  data() {
    return {
      pickers: [
        {
          title: '开始',
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06', '2015-07'],
          defaultIndex: 3,
          className: ['slot1', 'slot4', {slot5: true}]
        }, {
          title: '结束',
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          defaultIndex: 2,
          className: 'slot3'
        }
      ]
    }
  },
  methods: {
    itemChanged(index, key, value) {
      log(index, key, value)
    }
  },
  components: {
    HiPicker
  }
})

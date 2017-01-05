import HiPicker from 'components/HiPicker'

export default require('./index.pug')({
  data() {
    return {
      pickers: [
        {
          title: '开始',
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06', '2015-07'],
          defaultIndex: 3,
          className: ['slot1', 'slot4', {slot5: true}],
          textAlign: 'right'
        }, {
          divider: '-',
          className: 'slot2'
        }, {
          title: '结束',
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          defaultIndex: 2,
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
    },
    itemChanged(index, key, value) {
      console.log(index, key, value)
    }
  },
  components: {
    HiPicker
  }
})

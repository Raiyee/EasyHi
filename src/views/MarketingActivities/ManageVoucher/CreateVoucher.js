import moment from 'moment'

import {mapGetters} from 'vuex'

import ModalItem from 'components/HiModal/ModalItem'

import {
  alert,
  datePicker,
  formatDate,
  picker,
  isAfterToday,
  pick,
  remove,
  DATE_FORMAT2,
  PICKER_ID,
  MAX_MONEY,
  MIN_MONEY
} from 'utils'

import classes from './create-voucher.styl'

export default require('./create-voucher.pug')({
  props: {
    confirm: Function,
    courses: Array,
    typeIndex: Number
  },
  data() {
    return {
      classes,
      voucherName: null,
      voucherValue: null,
      voucherTimes: null,
      miniConsume: this.typeIndex ? null : 0,
      voucherExpiredType: false,
      voucherExpiredLimit: 7,
      voucherExpiredRange: [],
      applicableCourses: [],
      picking: false
    }
  },
  computed: {
    ...mapGetters(['rem', 'winHeight']),
    height() {
      return this.winHeight - 64 * this.rem + 'px'
    },
    expiredRange() {
      return this.voucherExpiredRange.map(date => formatDate(date, DATE_FORMAT2)).join('至')
    },
    confirmable() {
      return this.voucherName && this.voucherValue &&
        (this.typeIndex ? this.miniConsume : this.voucherTimes && this.applicableCourses.length)
    },
    activeAllCourses() {
      return this.applicableCourses.length === this.courses.length
    },
    voucherTypeName() {
      return `${this.typeIndex ? '现金' : '体验'}券`
    }
  },
  methods: {
    toggleAllCourses() {
      this.applicableCourses = this.activeAllCourses ? [] : this.courses.map(({courseId}) => courseId)
    },
    toggleActiveCourse(courseId) {
      remove(this.applicableCourses, courseId) || this.applicableCourses.push(courseId)
    },
    changeExpired() {
      picker({
        pickers: [{
          defaultIndex: +this.voucherExpiredType,
          values: ['从领券成功开始计算', '指定有效期']
        }],
        close: () => {
          this.picking = false
          this.$modal.close(PICKER_ID)
        },
        confirm: voucherExpiredType => {
          this.$modal.close(PICKER_ID)
          const rangePicked = this.voucherExpiredRange.length === 2;
          (this.picking = voucherExpiredType && !rangePicked) || this.expiredChanged(voucherExpiredType)
        }
      }, {
        destroyed: this.chooseExpiredDates
      })
    },
    chooseExpiredDates() {
      if (!this.picking) return
      datePicker({
        pickerTabs: true,
        confirm: (startDate, endDate) => {
          if (!isAfterToday(moment(startDate).add(1, 'milliseconds')) || startDate > endDate) return alert('请选择正确的起止日期')
          this.$modal.close(PICKER_ID)
          this.voucherExpiredRange = [startDate, endDate]
          this.expiredChanged(true)
        }
      }, this.voucherExpiredRange[0])
    },
    expiredChanged(voucherExpiredType) {
      this.voucherExpiredType = voucherExpiredType
    },
    async confirmModal() {
      this.$v.$touch()

      this.voucherExpiredType && this.$v.voucherExpiredLimit.$reset()

      if (this.typeIndex) {
        this.$v.voucherTimes.reset()
      } else {
        this.$v.miniConsume.$reset()
      }

      if (this.$v.$error) return

      let voucherDescription

      if (!this.typeIndex) {
        voucherDescription = `面值${this.voucherTimes}元, 适用于${this.courses
          .filter(({courseId}) => this.applicableCourses.includes(courseId))
          .map(({courseName}) => courseName)
          .join('、')}。`
      }

      const voucher = pick(this, 'voucherName', 'voucherValue', 'voucherExpiredType', 'voucherExpiredLimit',
        'voucherExpiredRange', ...this.typeIndex ? ['miniConsume'] : ['voucherTimes', 'applicableCourses'])

      const url = this.typeIndex ? '/cash-coupon/create-cash-coupon' : '/experience-voucher/add-experience-voucher'

      voucher.voucherId = (await this.$http.post(url, {...voucher, voucherDescription})).data

      this.confirm && this.confirm(voucher)
    }
  },
  components: {
    ModalItem
  },
  validator: {
    miniConsume: {
      min: MIN_MONEY,
      max: MAX_MONEY
    },
    voucherName: {
      maxLength: 8
    },
    voucherTimes: {
      integer: true,
      maxLength: 3,
      min: 1,
      max: 100
    },
    voucherExpiredLimit: {
      integer: true,
      maxLength: 3,
      min: 1,
      max: 100
    },
    voucherValue: {
      min: MIN_MONEY,
      max: MAX_MONEY
    }
  }
})

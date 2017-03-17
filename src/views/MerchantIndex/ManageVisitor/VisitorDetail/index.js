import {mapGetters} from 'vuex'

import HiVouchers from 'components/HiVouchers'

import {log, picker, closeModal, alert, toast} from 'utils'

import classes from './index.styl'

const SOURCES = ['报刊广告', '会员介绍', '电话拜访', '微信公众号', '其他渠道']

const VOUCHER_SELECTOR = 'voucher-selector'

export default require('./index.pug')({
  name: 'visitor-detail',
  data() {
    return {
      classes,
      ...this.$route.meta.data,
      currIndex: 1,
      close: true,
      briefState: {
        minHeight: '20',
        maxHeight: '',
        briefIsOpen: true,
        briefIsOverflow: true
      },
      briefStyle: {
        height: 'auto'
      },
      packUpStyle: {
        'white-space': 'nowrap'
      }
    }
  },
  computed: {
    ...mapGetters(['merchantUrlPrefix', 'isEnterprise', 'isStaffS', 'isStaffA', 'isAdmin', 'mode']),
    source() {
      return SOURCES[this.sources] || SOURCES[SOURCES.length - 1]
    },
    level() {
      return this.visitorLevel.toUpperCase()
    },
    allAddress() {
      return this.provinceName ? this.provinceName + ' ' + this.cityName + ' ' + this.areaName + ' ' + this.address
        : '暂未填写'
    }
  },
  mounted() {
    const maxHeight = this.$refs.brief.offsetHeight
    Object.assign(this.briefState, {
      briefIsOpen: false,
      briefIsOverflow: maxHeight > this.briefState.minHeight,
      maxHeight
    })
    Object.assign(this.briefStyle, {
      height: this.briefState.minHeight + 'px'
    }, maxHeight > this.briefState.minHeight ? this.packUpStyle : {})
    log(this.briefState.maxHeight)
  },
  destroyed() {
    this.$modal.close(VOUCHER_SELECTOR, true)
  },
  methods: {
    briefToOpen(toOpen) {
      this.briefState.briefIsOpen = toOpen

      this.$nextTick(() => {
        this.briefStyle = Object.assign({}, {
          height: `${this.briefState[toOpen ? 'maxHeight' : 'minHeight']}px`
        }, toOpen ? {} : this.packUpStyle)
      })
    },
    briefTransitionEnd() {

    },
    giftVoucher() {
      const self = this
      this.$modal.open({
        id: VOUCHER_SELECTOR,
        component: import('components/HiSelector/VoucherSelector'),
        options: {
          show: true
        },
        props: {
          async confirm(vouchers) {
            await this.$http.post('/voucher/give-visitor-voucher', {
              userId: self.visitorId,
              vouchers
            })

            toast({
              tipText: '送券成功',
              close: () => location.reload()
            })
          }
        }
      })
    },
    goEditVisitor() {
      location.href = this.merchantUrlPrefix + 'member-manage/edit-visitor/' + this.visitorId
    },
    goAddMember() {
      location.href = this.merchantUrlPrefix + 'membermanage/member-edit/' + this.operationId + '/' + this.visitorId
    },
    reSetCurrIndex(currIndex) {
      this.currIndex = currIndex + 1
    },
    changeState() {
      this.close = !this.close
    },
    addFollowDynamic() {
      const {follows, visitorId} = this

      this.$modal.open({
        id: 'follow-dynamic-modal',
        component: import('./FollowUp'),
        options: {
          show: true,
          destroy: true
        },
        props: {
          confirm() {
            const {followType, remark} = this
            const follow = {
              followType: followType ? 1 : 0,
              remark: remark,
              visitorId: visitorId
            }

            this.$http.post('/member-manage/add-visitor-follow', follow).then(ret => {
              const {code, data} = ret.data
              if (code === '0') follows.unshift(data)
              this.$modal.close()
            })
          }
        }
      })
    },
    toggleAdvisor() {
      const self = this
      const {advisors, advisorId} = self
      if (!advisors || advisors.length === 0) {
        return alert({
          tipText: '当前还没有会籍顾问可供分配,<br>请在"员工管理"添加',
          confirm() {
            closeModal()
            location.href = self.merchantUrlPrefix + 'staff-manage/list'
          }
        })
      }
      const defaultIndex = advisors.findIndex(advisor => advisor.advisorId === advisorId)

      let result

      picker({
        pickers: [{
          valueKey: 'advisorId',
          defaultIndex: defaultIndex + 1 && defaultIndex,
          values: advisors.map(advisor => {
            advisor.text = `${advisor.advisorName}(${advisor.visitorNum})`
            return advisor
          })
        }],
        confirm() {
          closeModal()
          if (self.advisorId === this.result[0][0]) return
          result = this.result
        }
      }, {
        destroyed: () => {
          result && this.changeAdvisor(result)
        }
      })
    },
    async changeAdvisor(result) {
      const {advisors, advisorId} = this
      const originAdvisor = advisors.findIndex(advisor => advisor.advisorId === advisorId)
      const sourceAdvisor = advisors.findIndex(advisor => advisor.advisorId === result[0][0])

      const {data} = await this.$http.post('/member-manage/choose-advisor', {
        visitorId: this.visitorId,
        advisorId: result[0][0],
        advisorName: advisors[sourceAdvisor] && advisors[sourceAdvisor].advisorName
      })

      if (data) {
        advisors[originAdvisor] && advisors[originAdvisor].visitorNum--
        advisors[sourceAdvisor] && advisors[sourceAdvisor].visitorNum++
        this.advisorId = result[0][0]
        this.advisorName = advisors[sourceAdvisor] && advisors[sourceAdvisor].advisorName
      }

      alert(!data ? '分配失败!' : advisorId ? '更换会籍成功!' : '分配成功!')
    }
  },
  components: {
    HiVouchers
  }
})

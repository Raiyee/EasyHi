import {log, confirm, toast, prompt, picker, regionPicker, timePicker, closeModal, randomArr, randomId} from 'utils'
import {mock} from 'mockjs'

let modalId

export default require('./index.pug')({
  data() {
    return {
      options: {
        backdrop: false,
        show: true,
        destroy: true
      },
      promptText: '',
      pickers: [
        {
          title: '开始',
          valueKey: 'date',
          values: [
            {
              date: '201501',
              text: '2015年1月'
            }, {
              date: '201502',
              text: '2015年2月'
            }, {
              date: '201503',
              text: '2015年3月'
            }, {
              date: '201504',
              text: '2015年4月'
            }, {
              date: '201505',
              text: '2015年5月'
            }, {
              date: '201506',
              text: '2015年6月'
            }, {
              date: '201507',
              text: '2015年7月'
            }],
          className: ['slot1', 'slot4', {slot5: true}]
        }, {
          title: '结束',
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3'
        }
      ],
      regions: []
    }
  },
  methods: {
    addModal() {
      modalId = this.$modal.open({
        id: modalId,
        component: import('./ActualModal'),
        options: this.options,
        props: {
          bodyMsg: 'Just test body',
          transition: true
        }
      })
    },
    clearModal() {
      this.$modal.clear()
    },
    confirmModal() {
      confirm({
        tipText: '测试confirm 模态框',
        confirmText: '蓝瘦,香菇',
        confirm() {
          log('It is after confirm btn')
          closeModal()
        },
        close() {
          log('It is after cancel modal')
          closeModal()
        }
      })
    },
    toastModal() {
      toast({
        tipText: 'I am  a confirm modal tip Text',
        close() {
          log('It is a toast')
          closeModal()
        }
      })
    },
    promptModal() {
      prompt({
        tipText: '还不赶紧写原因？',
        promptText: this.promptText,
        placeholder: '在此填写原因(50字以内)，或者直接点击"确定"',
        confirm: promptText => {
          this.promptText = promptText
          closeModal()
        }
      })
    },
    pickerModal() {
      picker({
        pickers: this.pickers,
        pickerTitle: '测试',
        confirm() {
          log(this.result)
        }
      })
    },
    regionPickerModal() {
      const self = this
      regionPicker({
        confirm() {
          self.regions = this.result
          closeModal()
        }
      }, [10, 330400, '嘉善县'])
    },
    timePickerModal() {
      timePicker({
        pickerTabs: true,
        confirm(start, end) {
          log(start, end)
        }
      })
    },
    usersModal() {
      const user = {
        userId: randomId(),
        userPortrait: '', // 头像
        userName: '我的名字',
        userMobile: 18888888888,
        hasCashVoucher: true, // 是否有现金券标识
        isVisitor: true, // 是否是访客标识
        userGender: true // user性别
      }
      this.$modal.open({
        component: import('components/HiSelector/UserSelector'),
        options: {
          show: true,
          backdrop: true,
          full: true
        },
        props: {
          headerText: '请选择会员/访客',
          highlightText: '两周内到期会员',
          highlightUsers: randomArr(5).map(() => {
            return mock(user)
          }),
          users: {
            A: randomArr(2, 5).map(() => {
              return mock(user)
            }),
            C: randomArr(2, 5).map(() => {
              return mock(user)
            })
          },
          icons: [{
            condition: 'hasCashVoucher',
            iconClass: 'icon-daijinquan'
          }, {
            condition: 'isVisitor',
            iconClass: 'icon-daijinquan'
          }],
          confirm() {
          }
        }
      })
    }
  }
})

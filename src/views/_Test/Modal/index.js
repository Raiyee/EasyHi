import {alert, confirm, toast, picker, prompt, closeModal, login} from 'utils'

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
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06', '2015-07'],
          className: ['slot1', 'slot4', {slot5: true}]
        }, {
          divider: '-',
          className: 'slot2'
        }, {
          title: '结束',
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3'
        }
      ]
    }
  },
  methods: {
    loginModal() {
      login()
    },
    addModal() {
      modalId = this.$modal.open({
        id: modalId,
        component: System.import('./ActualModal'),
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
          console.log('It is after confirm btn')
          closeModal()
        },
        close() {
          console.log('It is after cancel modal')
          closeModal()
        }
      })
    },
    alertModal() {
      alert('I am  an alert <span style="color: red">red</span> modal Text')
    },
    toastModal() {
      toast({
        tipText: 'I am  a confirm modal tip Text',
        close() {
          console.log('It is a toast')
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
        confirm() {
          console.log(this, arguments)
        }
      })
    }
  }
})

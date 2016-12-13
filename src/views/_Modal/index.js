import {confirm, tip, toast, prompt, closeModal} from 'utils'

let modalId

export default require('./index.pug')({
  data() {
    return {
      options: {
        backdrop: false,
        show: true,
        destroy: true
      },
      promptText: ''
    }
  },
  methods: {
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
    tipModal() {
      tip('I am  a confirm <span style="color: red">red</span> modal tip Text')
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
    }
  }
})

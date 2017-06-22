import {alert, toast, error, isFunction, payByWechat, TIP_ID} from 'utils'

export default {
  name: 'hi-pay',
  created() {
    isFunction(this.afterPay) || error('you should define a method named "afterPay"')
  },
  methods: {
    async pay(orderId, goToResultOnError, prefix = '/qr-pay') {
      try {
        const {apiName, error, orderPayString} = (await this.$http.post(`${prefix}/create-pay-request/${orderId}`)).data
        switch (error) {
          case ('error'):
            alert('请在微信中使用！')
            break
          case ('create_request_error'):
            alert('支付创建失败！')
            break
          default:
            if (apiName !== 'WECHAT_JSAPI') return alert('支付接口不支持')
            payByWechat(orderPayString, async () => {
              await this.$http.post(`/qr-pay/paySuccess/${orderId}`)
              this.afterPay(orderId)
            }, result => toast({
              tipText: `支付${Object.values(result).find(value => value.indexOf('cancel')) ? '取消' : '失败'}！`,
              close: () => {
                this.$modal.close(TIP_ID)
                goToResultOnError && this.afterPay(orderId)
              }
            }))
        }
      } catch (e) {
        toast('支付创建失败')
      }
    }
  }
}

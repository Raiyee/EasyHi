import Mock from 'mockjs'

Mock.mock(/\/dynamic$/, () => {
  return [{
    template: `<div>{{ msg }}</div>`,
    data: {
      msg: `It's the first dynamic template!`
    }
  }, {
    template: `<div>
    {{ reverse ? $options.filters.reverse(msg) : msg }}
    <button class="btn btn-primary" @click="reverseMsg">Try to reverse me!</button>
</div>`,
    data: {
      msg: `It's the second dynamic template!`,
      reverse: false
    },
    methods: {
      reverseMsg: 'this.reverse = !this.reverse'
    }
  }, {
    template: `<div>More Magic Here!</div>`
  }]
})

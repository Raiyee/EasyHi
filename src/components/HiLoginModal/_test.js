let modalId;

export default {
  template:
  `<div>
    <div>
        <button style='border:1px solid red;background: grey' @click="click">点击试试</button>
    </div>
  </div>`,
  methods: {
    click(){
      this.$http('/419')
    }
  }

}

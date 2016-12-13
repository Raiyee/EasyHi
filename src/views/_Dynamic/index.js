import classes from './index.styl'

const TextAreaView = {
  data: () => ({
    text: '',
    classes
  }),
  template: `<div class="container">For example: (Just the part of js)
<a href="https://jsfiddle.net/JounQin/87sv5beu/embedded/">JsFiddle</a><br>
More complex:
<a href="https://jsfiddle.net/JounQin/aq0yjj7L/embedded">JsFiddle</a>
<textarea :class="classes.text" v-model="text"/></div>`
}

export default require('./index.pug')({
  name: 'website-edit',
  data() {
    return {
      built: false,
      comps: null,
      emptyView: TextAreaView,
      classes
    }
  },
  created() {
    this.comps = this.$route.meta.data
  },
  methods: {
    rebuild() {
      if (this.built) return (this.comps = null)
      try {
        const data = this.$refs.component.$children[0].text
        const getData = Function['call'](null, `return ${data}`)
        getData && (this.comps = getData())
      } catch (e) {
        this.$util.error(e)
        alert('请确认输入的内容是合法的模版数组')
      }
    },
    compBuilt(empty) {
      this.built = !empty
    }
  }
})

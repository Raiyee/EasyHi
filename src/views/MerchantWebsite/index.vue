<template>
  <div>
    <div class="text-center">
      <button class="btn" :class="$style.btn" @click="rebuild">{{ built ? 'Clear' : 'Rebuild' }} your own view</button>
    </div>
    <hr>
    <component :is="view" :classes="$style" ref="component"/>
  </div>
</template>
<script>
  import {warn, error} from 'utils'

  const TextAreaView = {
    props: ['classes'],
    data: () => ({
      text: ''
    }),
    template: `<div class="container">For example:
<a href="https://jsfiddle.net/JounQin/87sv5beu/embedded/">JsFiddle</a> (Just the part of js)
<textarea :class="classes.text" v-model="text"/></div>`
  }

  export default {
    name: 'website-edit',
    data() {
      return {
        built: false,
        view: TextAreaView
      }
    },
    created() {
      this.build(this.$route.meta.data)
    },
    methods: {
      build(data) {
        if (!data || !data.length) {
          this.built = false
          this.view = TextAreaView
          return
        }

        let wrapperTemplate = ''
        const components = {}
        data.forEach(({data, template, methods = {}}, index) => {
          if (!template) {
            warn('There is no template found thus this component will be ignored!')
            return
          }

          let componentName = `Component${index}`
          wrapperTemplate += `<${componentName}/>`
          const buildMethods = {}
          for (const [methodName, method] of Object.entries(methods)) {
            buildMethods[methodName] = Function.apply(null, Array.isArray(method) ? method : [method])
          }

          const component = components[componentName] = {
            template,
            methods: buildMethods
          }

          if (data) component.data = () => data
        })

        this.built = true
        this.view = {
          template: `<div>${wrapperTemplate}</div>`,
          components
        }
      },
      rebuild() {
        if (this.built) return this.build()
        try {
          const data = this.$refs.component.text
          if (!data.startsWith('[') || !data.endsWith(']') || data.match(/\beval\b *\(/)) throw Error('格式错误或使用了非法运算符')
          const getData = Function.apply(null, `return ${data}`)
          getData && this.build(getData())
        } catch (e) {
          error(e)
          alert('请确认输入的内容是合法的模版数组')
        }
      }
    }
  }
</script>
<style src="./index.styl" lang="styl" module/>

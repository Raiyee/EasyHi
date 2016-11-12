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
  import {warn, error, isArray, isFunction, isObject} from 'utils'

  const TextAreaView = {
    props: ['classes'],
    data: () => ({
      text: ''
    }),
    template: `<div class="container">For example: (Just the part of js)
<a href="https://jsfiddle.net/JounQin/87sv5beu/embedded/">JsFiddle</a><br>
More complex:
<a href="https://jsfiddle.net/JounQin/aq0yjj7L/embedded">JsFiddle</a>
<textarea :class="classes.text" v-model="text"/></div>`
  }

  const objComponentsToArray = objComponents => {
    const components = []
    for (const [key, value] of Object.entries(objComponents)) {
      isObject(value) && components.push(Object.assign(value, {name: key}))
    }
    return components
  }

  const invalidMsg = msg => warn(`invalid ${msg} will be ignored!`)
  const nonMsg = msg => warn(`no ${msg} found thus it will be ignored!`)

  const buildComponent = (components, notFirst) => {
    if (!components) return

    if (isObject(components)) {
      components = objComponentsToArray(components)
    } else if (!isArray(components)) return invalidMsg('components')
    if (!components.length) return nonMsg('components')

    let wrapTemp = ''
    let wrapComp = {}
    let count = 0

    components.forEach(({name = `_${index}`, template, data, methods, components}, index) => {
      if (!template) return nonMsg('template')

      wrapTemp += `<${name}/>`
      const component = wrapComp[name] = {template}

      if (isObject(methods)) {
        let wrapMethods = {}
        for (const [methodName, method] of Object.entries(methods)) {
          wrapMethods[methodName] = isFunction(method) ? method
            : Function[isArray(method) ? 'apply' : 'call'](null, method)
        }
        component.methods = wrapMethods
      } else if (methods) return invalidMsg('methods')
      if (data) component.data = isFunction(data) ? data : () => data
      if (components) component.components = buildComponent(components, true)

      count++
    })

    if (!count) return

    return notFirst ? wrapComp : {
      name: 'Dynamic--Root',
      template: count === 1 ? wrapTemp : `<div>${wrapTemp}</div>`,
      components: wrapComp
    }
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
      buildDefaultView() {
        this.built = false
        this.view = TextAreaView
      },
      build(data) {
        const component = buildComponent(data)
        if (!component) return this.buildDefaultView()
        this.built = true
        this.view = component
      },
      rebuild() {
        if (this.built) return this.buildDefaultView()
        try {
          const data = this.$refs.component.text
          const getData = Function['call'](null, `return ${data}`)
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

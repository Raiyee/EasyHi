<template>
  <component :is="current"/>
</template>
<script>
  import Vue from 'vue';

  const Loading = Vue.extend({
    template: '<div>Loading……</div>'
  });

  export default {
    name: 'website-edit',
    data() {
      return {
        current: 'Loading'
      };
    },
    beforeCreate() {
      this.$http.get('/get-website-edit').then(resp => {
        const data = resp.json();
        const template = data.reduce((previous, current, index) => `${previous}<Component${index}/>`, '');
        const components = {};

        data.forEach((value, index) => {
          components[`Component${index}`] = Vue.extend({
            data: () => value.data,
            template: `<div>${value.componentTpl}</div>`
          });
        });

        const componentName = `ComponentsWrapper${~~(Math.random() * 1000)}`;

        Vue.component(componentName, {
          name: componentName,
          template: `<div>${template}</div>`,
          components
        });

        this.current = componentName;
      });
    },
    components: {Loading}
  };
</script>


<template>
  <component :is="current"/>
</template>
<script>
  import Vue from 'vue';

  export default {
    name: 'website-edit',
    data() {
      return {
        current: Vue.extend({
          template: '<div>Loading……</div>'
        })
      };
    },
    beforeCreate() {
      this.$http.get('/get-website-edit').then(resp => {
        let template = '';
        const components = {};

        resp.json().forEach(({data, componentTpl}, index) => {
          template += `<Component${index}/>`;
          components[`Component${index}`] = Vue.extend({
            data: () => data,
            template: `<div>${componentTpl}</div>`
          });
        });

        this.current = Vue.extend({
          name: 'ComponentsWrapper',
          template: `<div>${template}</div>`,
          components
        });
      });
    }
  };
</script>

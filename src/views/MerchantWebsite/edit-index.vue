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
        const data = resp.json();

        let template = '';
        const components = {};

        data.forEach((value, index) => {
          template += `<Component${index}/>`;
          components[`Component${index}`] = Vue.extend({
            data: () => value.data,
            template: `<div>${value.componentTpl}</div>`
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

<template>
  <component :is="current"/>
</template>
<script>
  export default {
    name: 'website-edit',
    data() {
      return {
        current: {
          template: '<div>Loading……</div>'
        }
      };
    },
    beforeCreate() {
      this.$http.get('/get-website-edit').then(resp => {
        let wrapperTemplate = '';
        const components = {};

        resp.json().forEach(({data, template}, index) => {
          let component = `Component${index}`;
          wrapperTemplate += `<${component}/>`;
          components[component] = {
            data: () => data,
            template
          };
        });

        this.current = {
          name: 'ComponentsWrapper',
          template: `<div>${wrapperTemplate}</div>`,
          components
        };
      });
    }
  };
</script>

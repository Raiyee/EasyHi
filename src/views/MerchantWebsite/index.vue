<template>
  <component :is="view"/>
</template>
<script>
  export default {
    name: 'website-edit',
    beforeCreate() {
      let wrapperTemplate = '';
      const components = {};

      this.$route.meta.data.forEach(({data, template}, index) => {
        let component = `Component${index}`;
        wrapperTemplate += `<${component}/>`;
        components[component] = {
          data: () => data,
          template
        };
      });

      this.view = {
        template: `<div>${wrapperTemplate}</div>`,
        components
      };
    }
  };
</script>

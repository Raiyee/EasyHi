<template>
  <component :is="current"/>
</template>
<script>
  export default {
    name: 'website-edit',
    beforeCreate() {
      const data = this.$route.meta.data;
      let wrapperTemplate = '';
      const components = {};

      data.forEach(({data, template}, index) => {
        let component = `Component${index}`;
        wrapperTemplate += `<${component}/>`;
        components[component] = {
          data: () => data,
          template
        };
      });

      this.current = {
        template: `<div>${wrapperTemplate}</div>`,
        components
      };
    }
  };
</script>

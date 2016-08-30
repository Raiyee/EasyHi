<script>
  export default {
    name: 'website-edit',
    template: `<component :is="current"/>`,
    beforeCreate(){
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

      this.current = {
        template: `<div>${wrapperTemplate}</div>`,
        components
      }
    }
  }
</script>

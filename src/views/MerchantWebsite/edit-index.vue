<script>
  export default require('vue').http.get('/get-website-edit')
    .then(resp => {
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

      return {
        name: 'website-edit',
        template: '<ComponentsWrapper/>',
        components: {
          ComponentsWrapper: {
            template: `<div>${wrapperTemplate}</div>`,
            components
          }
        }
      };
    });
</script>

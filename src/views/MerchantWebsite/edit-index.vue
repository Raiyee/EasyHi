<script>
  import Vue from 'vue';
  export default {
    data() {
      return {};
    },
    created() {
      this.$http.get('/get-webiste-edit').then(ret => {
        const data = ret.json();
        let template = '';
        data.map((value, index) => {
          template += `<component_${index}/>`;
        });
        var outerComponents = Vue.component('outerComponents', {
          data() {
            return {};
          },
          created() {
            data.map((value, index) => {
              Vue.component(`component_${index}`, {
                data() { return value.data; },
                template: `<span>${value.componentTpl}</span>`
              });
            });
          },
          template: `<div>${template}</div>`
        });
        this.components = {
          outerComponents
        };
      });
    },
    template: '<outerComponents/>'
  };
</script>


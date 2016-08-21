import {mapGetters} from 'vuex';

export default {
  name: 'member-index',
  computed: {
    ...mapGetters(['height'])
  },
  methods: {
    animationEnd: function (e) {
      const target = e.target;
      target.className = target.className.replace(/(^| +)animated($| +)/, ' ').trim();
    },
    scale: function (e) {
      e.currentTarget.nextElementSibling.className += ' animated';
    }
  }
};

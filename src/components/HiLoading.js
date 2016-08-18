import classes from './HiLoading.css';

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'snake'
    }
  },
  render(h) {
    return (
      <div class={[classes.loading, this.className]}>
        <div class={classes['loading-' + this.theme]}></div>
        {this.$slots.default}
      </div>
    );
  }
};

import HiLoading from './HiLoading.common';
import classes from './HiLoading.css';

export default {
  ...HiLoading,
  render(h) {
    return (
      <div class={[classes.hiLoading, this.className]}>
        <div class={classes['hi-loading-' + this.theme]}/>
        {this.$slots.default}
      </div>
    );
  }
};

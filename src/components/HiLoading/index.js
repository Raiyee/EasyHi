import HiLoading from './index.common';
import classes from './index.css';

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

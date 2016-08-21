import HiProgress from './HiProgress.common';
import classes from './HiProgress.css';

export default {
  ...HiProgress,
  render(h) {
    return <div class={[classes.hiProgress, this.className]} style={{width: this.progress + '%'}}/>;
  }
};

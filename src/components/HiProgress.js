import classes from './HiProgress.css';

export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  render(h) {
    return <div class={[classes.progress, this.className]} style={{width: this.progress + '%'}}/>;
  }
};

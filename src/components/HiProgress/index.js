import HiProgress from './index.common'
import classes from './index.css'

export default {
  ...HiProgress,
  render(h) {
    return <div class={[classes.hiProgress, this.className]} style={{width: this.progress + '%'}}/>
  }
}

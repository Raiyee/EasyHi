import HiProgress from './index.common'
import $style from './index.css'

export default {
  ...HiProgress,
  render(h) {
    return <div class={[$style.hiProgress, this.className]} style={{width: this.progress + '%'}}/>
  }
}

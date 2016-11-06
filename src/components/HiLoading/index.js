import HiLoading from './index.common'
import $style from './index.css'

export default {
  ...HiLoading,
  render(h) {
    return (
      <div class={[$style.hiLoading, this.className]}>
        <div class={$style['hi-loading-' + this.theme]}/>
        {this.$slots.default}
      </div>
    )
  }
}

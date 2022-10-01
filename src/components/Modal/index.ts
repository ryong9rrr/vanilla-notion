import Component from '~/core/component'
import { Props, State } from './types'
import { template } from './template'
import { OnSubmit } from '~/models/document'

const initialState: State = {
  isView: false,
}

export default class Modal extends Component<State> {
  onSubmit: OnSubmit
  constructor({ parentId, onSubmit }: Props) {
    super({ parentId, initialState, tag: 'div', template })
    this.$container.className = 'modal'
    this.onSubmit = onSubmit
    this.attachEventHandler('click', this.handleCloseModal)
  }

  componentDidUpdate() {
    if (this.state.isView) {
      const input = this.$container.querySelector('input[name=title]') as HTMLInputElement
      input.focus()
    }
  }

  private handleCloseModal(e: Event) {
    const $target = e.target as HTMLElement
    if ($target && !$target.classList.contains('modal-wrapper')) {
      return
    }
    const $input = this.$container.querySelector('input') as HTMLInputElement
    const title = $input.value
    if (title) {
      this.onSubmit({
        title,
        parentNodeId: this.state.parentNodeId,
      })
    }
    this.setState({
      ...this.state,
      isView: false,
    })
  }
}

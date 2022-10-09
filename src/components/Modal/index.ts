import Component from '~/core/component'
import { OnSubmit } from '~/models/document'
import { Props, State } from './types'
import template from './template'

const initialState: State = {
  isView: false,
}

export default class Modal extends Component<State> {
  private onSubmit: OnSubmit
  constructor({ parentElement, onSubmit }: Props) {
    super({ parentElement, initialState, template })
    this.element.className = 'modal'
    this.onSubmit = onSubmit
    this.attachEventHandler('click', this.handleCloseModal)
  }

  protected componentDidUpdate() {
    if (this.state.isView) {
      const input = this.element.querySelector('input[name=title]') as HTMLInputElement
      input.focus()
    }
  }

  private handleCloseModal(e: Event) {
    const $target = e.target as HTMLElement
    if ($target && !$target.classList.contains('modal-wrapper')) {
      return
    }
    const $input = this.element.querySelector('input') as HTMLInputElement
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

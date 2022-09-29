import Component from '~/core/component'
import { Props, State } from './types'
import { ID_NAME, template } from './template'

const initialState = {
  isView: false,
}

export default class Modal extends Component<State> {
  onSubmit?: (parentId: string, title: string) => void
  constructor({ parentId, onSubmit }: Props) {
    super({ parentId, initialState, tag: 'div', template })
    this.onSubmit = onSubmit
    this.attachEventHandler('click', this.handleCloseModal)
  }

  render() {
    const { isView } = this.state
    this.$container.innerHTML = template(this.state)
    if (isView) {
      const input = this.$container.querySelector('input[name=title]') as HTMLInputElement
      input.focus()
    }
  }

  private handleCloseModal(e: Event) {
    const $target = e.target as HTMLElement
    if ($target && $target.id !== ID_NAME.modalWrapper) {
      return
    }
    const $input = this.$container.querySelector(`#${ID_NAME.modalInput}`) as HTMLInputElement
    const title = $input.value
    if (title && this.state.parentId) {
      this.onSubmit && this.onSubmit(this.state.parentId, title)
    }
    this.setState({
      ...this.state,
      isView: false,
    })
  }
}

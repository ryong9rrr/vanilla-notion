import Component from '~/core/component'
import { OnSubmit } from '~/models/document'

type State = {
  parentNodeId?: number
  isView: boolean
}

interface Props {
  parentId: string
  onSubmit: OnSubmit
}

const initialState: State = {
  isView: false,
}

export default class Modal extends Component<State> {
  onSubmit: OnSubmit
  constructor({ parentId, onSubmit }: Props) {
    super({ parentId, initialState })
    this.$container.className = 'modal'
    this.onSubmit = onSubmit
    this.attachEventHandler('click', this.handleCloseModal)
  }

  template(state: State): string {
    const { isView } = state
    if (!isView) {
      return ''
    }

    return `
    <div class="modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-contents">
          <input name="title" placeholder="제목을 입력하세요" />
        </div>
      </div>
    </div>
  `
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

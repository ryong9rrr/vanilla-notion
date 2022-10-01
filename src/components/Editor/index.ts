import Component from '~/core/component'
import { Props, State } from './types'
import { template } from './template'
import { OnEditing } from '~/models/document'

const initialState: State = {
  document: {},
}

export default class Editor extends Component<State> {
  onEditing: OnEditing
  constructor({ parentId, onEditing }: Props) {
    super({ parentId, initialState, tag: 'div', template })
    this.onEditing = onEditing
    this.attachEventHandler('keyup', this.handleKeyup)
  }

  private handleKeyup(e: Event) {
    const $target = e.target as HTMLInputElement | HTMLTextAreaElement
    if (!$target) {
      return
    }
    if ($target.id === 'editor-title') {
      this.state.document.title = $target.value
    }
    if ($target.id === 'editor-content') {
      this.state.document.content = $target.value
    }

    this.state.document.id &&
      this.state.document.title &&
      this.state.document.content &&
      this.onEditing({
        id: this.state.document.id,
        title: this.state.document.title,
        content: this.state.document.content,
      })
  }
}

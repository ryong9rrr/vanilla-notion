import Component from '~/core/component'
import { Props, State } from './types'
import { template } from './template'

const initialState = {}

export default class Editor extends Component<State> {
  onEditing?: (id: number, { title, content }: { title: string; content: string }) => void
  constructor({ parentId, onEditing }: Props) {
    super({ parentId, initialState, tag: 'div', template })
    this.onEditing = onEditing

    this.attachEventHandler('keyup', this.handleKeyup)
  }

  private handleKeyup(e: Event) {
    const $target = e.target as HTMLInputElement | HTMLTextAreaElement
    if (!$target) return

    if ($target.id === 'editor-title') {
      this.state.title = $target.value
    }

    if ($target.id === 'editor-content') {
      this.state.content = $target.value
    }

    this.onEditing &&
      this.state.id &&
      this.state.title &&
      this.state.content &&
      this.onEditing(this.state.id, {
        title: this.state.title,
        content: this.state.content,
      })
  }
}

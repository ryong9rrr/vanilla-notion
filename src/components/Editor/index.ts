import Component from '~/core/component'
import { Props, State } from './types'
import { ID_NAME, template } from './template'

const initialState = {}

export default class Editor extends Component<State> {
  onEditing?: (id: number, { title, content }: { title: string; content: string }) => void
  constructor({ parentId, onEditing }: Props) {
    super({ parentId, initialState, tag: 'div', template })
    this.onEditing = onEditing

    this.attachEventHandler('keyup', this.handleKeyup)
  }

  private handleKeyup(e: Event) {
    const $target = e.target as HTMLInputElement
    if ($target && $target.tagName === 'INPUT') {
      const { id, value } = $target
      if (id === ID_NAME.title) {
        this.state.title = value
      }
      if (id === ID_NAME.content) {
        this.state.content = value
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
}

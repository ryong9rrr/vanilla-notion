import Component from '~/core/component'
import { OnEditing } from '~/models/document'
import template from './template'
import { Props, State } from './types'

const initialState: State = {
  document: null,
}

export default class Editor extends Component<State> {
  private onEditing: OnEditing
  constructor({ parentElement, onEditing }: Props) {
    super({ parentElement, initialState, template, tag: 'div' })
    this.element.className = 'editor'
    this.onEditing = onEditing
    this.attachEventHandler('keyup', this.handleKeyup)
  }

  private handleKeyup(e: Event) {
    const $target = e.target as HTMLInputElement | HTMLTextAreaElement
    if (!$target || !this.state.document) {
      return
    }
    if ($target.tagName === 'INPUT' && $target.name === 'title') {
      this.state.document.title = $target.value
    }
    if ($target.tagName === 'TEXTAREA' && $target.name === 'content') {
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

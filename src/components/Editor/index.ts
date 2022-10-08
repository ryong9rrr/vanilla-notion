import Component from '~/core/component'
import { IDocument, OnEditing } from '~/models/document'

type State = {
  document: IDocument | null
}

interface Props {
  parentId: string
  onEditing: OnEditing
}

const initialState: State = {
  document: null,
}

export default class Editor extends Component<State> {
  onEditing: OnEditing
  constructor({ parentId, onEditing }: Props) {
    super({ parentId, initialState, tag: 'div' })
    this.$container.className = 'editor'
    this.onEditing = onEditing
    this.attachEventHandler('keyup', this.handleKeyup)
  }

  template(state: State): string {
    const { document } = state
    if (!document) {
      return ''
    }
    const { title, content } = document
    return `
      <input name="title" placeholder="제목을 입력하세요." value="${title}" />
      <textarea name="content" placeholder="내용을 입력하세요." >${content}</textarea>
      `
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

import { Editor } from '~/components'
import { Props, State } from './types'

export default class ContentPage {
  state: State = { document: null }
  Editor: Editor
  constructor({ parentId, onEditing }: Props) {
    this.Editor = new Editor({ parentId, onEditing })
  }

  setState(nextState: State) {
    this.state = nextState
    if (this.state.document === null) {
      return
    }
    const { id, title, content, documents, createdAt, updatedAt } = this.state.document
    this.Editor.setState({
      document: {
        id,
        title: title || '',
        content: content || '',
        documents,
        createdAt,
        updatedAt,
      },
    })
  }
}

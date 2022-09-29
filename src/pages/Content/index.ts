import { Editor } from '~/components'
import { IDocument } from '~/models/document'
import { Props } from './types'

type State = IDocument | undefined

export default class ContentPage {
  state: State
  Editor: Editor
  onEditing?: any
  // onEditing?: (id: number, { title, content }: { title: string; content: string }) => void
  constructor({ parentId, onEditing }: Props) {
    this.Editor = new Editor({ parentId, onEditing })
  }

  setState(nextState: State) {
    this.state = nextState

    if (this.state) {
      this.Editor.setState({
        id: this.state.id,
        title: this.state.title,
        content: this.state.content || '',
        documents: this.state.documents,
        createdAt: this.state.createdAt,
        updatedAt: this.state.updatedAt,
      })
    }
  }
}

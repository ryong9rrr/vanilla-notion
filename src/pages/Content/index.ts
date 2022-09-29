import { Editor } from '~/components'
import { IDocument } from '~/models/document'
import { Props } from './types'

interface State {
  id?: number
  title?: string
  content?: string
  documents?: IDocument[]
  createdAt?: string
  updatedAt?: string
}

export default class ContentPage {
  state: State = {}
  Editor: Editor
  onEditing?: (id: number, { title, content }: { title: string; content: string }) => void
  constructor({ parentId, onEditing }: Props) {
    this.Editor = new Editor({ parentId, onEditing })
  }

  setState(nextState: State) {
    this.state = nextState

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

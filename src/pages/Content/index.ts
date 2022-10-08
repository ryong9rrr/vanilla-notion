import { Editor } from '~/components'
import View from '~/core/view'
import { Props, State } from './types'

const template = () => ``

const initialState: State = {
  document: null,
}
export default class ContentPage extends View<State> {
  Editor: Editor
  constructor({ parentId, onEditing }: Props) {
    super({ parentId, initialState, template })
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

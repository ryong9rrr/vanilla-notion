import { isCalledByNew, isValidTypeOfObject } from '../core/validate'
import { Editor } from '../components/index'
import { TYPE_CONTENT_STATE } from '../types/state'

export default function ContentPage({ $target, onEditing }: any) {
  isCalledByNew(new.target, 'Cotent')

  const editor = new Editor({
    $target,
    onEditing,
  })

  this.state = null

  this.setState = (nextState: any) => {
    this.state = isValidTypeOfObject(nextState, TYPE_CONTENT_STATE)
    editor.setState({
      id: this.state.id,
      title: this.state.title,
      content: this.state.content || '',
      documents: this.state.documents,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
    })
  }
}

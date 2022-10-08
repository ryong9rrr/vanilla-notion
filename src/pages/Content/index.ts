import { Editor } from '~/components'
import View from '~/core/view'
import documentApi from '~/services/document'
import { Props } from './types'

const template = () => ``

export default class ContentPage extends View {
  Editor: Editor
  constructor({ parentId, onEditing }: Props) {
    super({ parentId, template })
    this.Editor = new Editor({ parentId, onEditing })
  }

  async componentDidMount() {
    const params = window.location.pathname
    const id = params.replace('/document/', '')
    const document = await this.fetchDocument(parseInt(id, 10))
    this.Editor.setState({
      document,
    })
  }

  async fetchDocument(id: number) {
    const document = await documentApi.getDocument(id)
    return document
  }
}

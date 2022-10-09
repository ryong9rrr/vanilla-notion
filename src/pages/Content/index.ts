import { Editor } from '~/components'
import Router from '~/core/router'
import View from '~/core/view'
import { OnEditing } from '~/models/document'
import documentApi from '~/services/document'

interface Props {
  parentId: string
  onEditing: OnEditing
}

export default class ContentPage extends View {
  private Editor: Editor
  constructor({ parentId, onEditing }: Props) {
    super({ parentId })
    this.Editor = new Editor({
      parentElement: document.querySelector(`${parentId}`) as HTMLElement,
      onEditing,
    })
  }

  template(): string {
    return ``
  }

  async componentDidMount() {
    const params = window.location.pathname
    const id = params.replace('/document/', '')
    try {
      const document = await this.fetchDocument(parseInt(id, 10))
      this.Editor.setState({
        document,
      })
    } catch (e) {
      window.alert('존재하지 않는 페이지입니다. 홈으로 돌아갑니다.')
      Router.navigate('/')
    }
  }

  private async fetchDocument(id: number) {
    const document = await documentApi.getDocument(id)
    return document
  }
}

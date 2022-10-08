import Component from '~/core/component'
import Router from '~/core/router'
import { IDocument } from '~/models/document'
import SidebarList from '../SidebarList'

type State = {
  documents: IDocument[]
}

interface Props {
  parentId: string
  initialState: State
  onAdd: (documentId?: string, title?: string) => void
  onRemove: (documentId: string) => void
}

export default class Sidebar extends Component<State> {
  private SidebarList: SidebarList
  private onAdd: (documentId?: string, title?: string) => void
  constructor({ parentId, initialState, onAdd, onRemove }: Props) {
    super({ parentId, initialState })
    this.onAdd = onAdd
    this.attachEventHandler('click', this.handleClickEvents)

    this.SidebarList = new SidebarList({
      parentId: '#sidebar-list',
      initialState,
      onAdd,
      onRemove,
    })
  }

  template(state: State): string {
    return `
      <header id="sidebar-header" class="sidebar-component">
        📔 상윤의 notion
      </header>
      <div id="sidebar-list"></div>
      <div id="root-add-button" class="sidebar-component">
        + 새 페이지
      </div>
    `
  }

  protected componentDidUpdate(): void {
    this.SidebarList.setState({
      ...this.SidebarList.state,
      documents: this.state.documents,
    })
  }

  private handleClickEvents(e: Event) {
    const $target = e.target as HTMLElement
    if ($target.id === 'sidebar-header') {
      this.handleClickSidebarHeader()
      return
    }
    if ($target.id === 'root-add-button') {
      this.handleClickCreateRootDocument()
      return
    }
  }

  private handleClickSidebarHeader() {
    Router.navigate('/')
  }

  private handleClickCreateRootDocument() {
    this.onAdd()
  }
}

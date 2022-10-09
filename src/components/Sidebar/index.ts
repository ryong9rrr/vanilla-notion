import Component from '~/core/component'
import Router from '~/core/router'
import { IDocument } from '~/models/document'
import SidebarList from './SidebarList'

type State = {
  documents: IDocument[]
}

interface Props {
  parentElement: HTMLElement
  initialState: State
  onAdd: (documentId?: number, title?: string) => void
  onRemove: (documentId: number, title: string) => void
}

export default class Sidebar extends Component<State> {
  private onAdd: (documentId?: number, title?: string) => void
  private onRemove: (documentId: number, title: string) => void
  constructor({ parentElement, initialState, onAdd, onRemove }: Props) {
    super({ parentElement, initialState })
    this.onAdd = onAdd
    this.onRemove = onRemove
    this.attachEventHandler('click', this.handleClickEvents)
  }

  template(state: State): string {
    return `
      <header id="sidebar-header" class="sidebar-component">
        📔 상윤의 notion
      </header>
      <div id="sidebars"></div>
      <div id="root-add-button" class="sidebar-component">
        + 새 페이지
      </div>
    `
  }

  protected componentDidUpdate() {
    this.renderSidebars()
  }

  private renderSidebars() {
    this.state.documents.map((document) => {
      const $div = window.document.createElement('div')
      new SidebarList({
        parentElement: $div as HTMLElement,
        initialState: {
          isParentSpread: true,
          isSpread: false,
          document,
          subDocuments: document.documents,
          depth: 0,
        },
        onAdd: this.onAdd.bind(this),
        onRemove: this.onRemove.bind(this),
      })
      ;(this.element.querySelector('#sidebars') as HTMLElement).appendChild($div)
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

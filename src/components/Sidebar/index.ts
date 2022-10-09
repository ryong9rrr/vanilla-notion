import Component from '~/core/component'
import Router from '~/core/router'
import { Props, State } from './types'
import template from './template'
import SidebarList from './SidebarList'

export default class Sidebar extends Component<State> {
  private onAdd: (documentId?: number, title?: string) => void
  private onRemove: (documentId: number, title: string) => void
  constructor({ parentElement, initialState, onAdd, onRemove }: Props) {
    super({ parentElement, initialState, template })
    this.onAdd = onAdd
    this.onRemove = onRemove
    this.attachEventHandler('click', this.handleClickEvents)
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

import Component from '~/core/component'
import Router from '~/core/router'
import { Props, State } from './types'
import template from './template'
import LastNode from '../LastNode'

export default class SidebarList extends Component<State> {
  onAdd: (documentId: number, title: string) => void
  onRemove: (documentId: number, title: string) => void
  constructor({ parentElement, initialState, onAdd, onRemove }: Props) {
    super({ parentElement, initialState, template })
    this.element.classList.add('sidebar-list')
    this.onAdd = onAdd
    this.onRemove = onRemove
    this.attachEventHandler('click', this.handleClickEvents)
  }

  protected componentDidUpdate() {
    this.renderSubSidebars()
  }

  private handleClickEvents(e: Event) {
    e.stopPropagation()
    const $target = e.target as HTMLElement
    if ($target.classList.contains('toggle')) {
      this.handleToggle()
      return
    }

    if ($target.classList.contains('add')) {
      this.handleClickAdd()
      return
    }

    if ($target.classList.contains('remove')) {
      this.handleClickRemove()
      return
    }

    if ($target.classList.contains('title')) {
      this.handleClickList()
      return
    }
  }

  private handleClickAdd() {
    const { id, title } = this.state.document
    this.onAdd(id, title)
  }

  private handleClickRemove() {
    const { id, title } = this.state.document
    this.onRemove(id, title)
  }

  private handleClickList() {
    Router.navigate(`/document/${this.state.document.id}`)
  }

  private handleToggle() {
    this.setState({
      ...this.state,
      isSpread: !this.state.isSpread,
    })
  }

  private renderSubSidebars() {
    if (this.state.subDocuments.length > 0) {
      this.state.subDocuments.map((document) => {
        const $div = window.document.createElement('div')
        new SidebarList({
          parentElement: $div,
          initialState: {
            isParentSpread: this.state.isSpread,
            isSpread: false,
            document,
            subDocuments: document.documents,
            depth: this.state.depth + 1,
          },
          onAdd: this.onAdd.bind(this),
          onRemove: this.onRemove.bind(this),
        })
        ;(this.element.querySelector('.sub-components') as HTMLElement).appendChild($div)
      })
    } else {
      new LastNode({
        parentElement: this.element,
        initialState: {
          isParentSpread: this.state.isSpread,
          depth: this.state.depth + 1,
        },
      })
    }
  }
}

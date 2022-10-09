import Component from '~/core/component'
import Router from '~/core/router'
import { IDocument } from '~/models/document'
import LastNode from './LastNode'

type State = {
  isParentSpread: boolean
  isSpread: boolean
  document: IDocument
  subDocuments: IDocument[]
  depth: number
}

interface Props {
  parentElement: HTMLElement
  initialState: State
  onAdd: (documentId: number, title: string) => void
  onRemove: (documentId: number, title: string) => void
}

export default class SidebarList extends Component<State> {
  onAdd: (documentId: number, title: string) => void
  onRemove: (documentId: number, title: string) => void
  constructor({ parentElement, initialState, onAdd, onRemove }: Props) {
    super({ parentElement, initialState })
    this.element.classList.add('sidebar-list')
    this.onAdd = onAdd
    this.onRemove = onRemove
    this.attachEventHandler('click', this.handleClickEvents)
  }

  template(state: State): string {
    if (!state.isParentSpread) return ''
    return `
      <div style="margin-left:${state.depth * 15}px">
        <button class="toggle">${!state.isSpread ? '▶︎' : '▼'}</button>
        <h4 class="title">${state.document.title}</h4>
        <button class="add">추가</button>
        <button class="remove">삭제</button>
      </div>
      <div class="sub-components"></div>
    `
  }

  protected componentDidUpdate() {
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
}

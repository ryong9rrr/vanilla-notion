import Component from '~/core/component'
import Router from '~/core/router'
import { IDocument } from '~/models/document'
import { CLASS_NAME, makeListHtml } from './template'

type State = {
  isSpread: boolean
  document: IDocument
}

interface Props {
  parentId: string
  initialState: State
  onAdd: (documentId: number, title: string) => void
  onRemove: (documentId: number) => void
}

export default class SidebarList extends Component<State> {
  onAdd: (documentId: number, title: string) => void
  onRemove: (documentId: number) => void
  constructor({ parentId, initialState, onAdd, onRemove }: Props) {
    super({ parentId, initialState })
    this.onAdd = onAdd
    this.onRemove = onRemove
    this.attachEventHandler('click', this.handleClickEvents)
  }

  template(state: State): string {
    if (state.document.documents.length === 0) {
      return '<div>하위 페이지가 없어요.</div>'
    }
    state.document.documents
      .map(
        (document) =>
          new SidebarList({
            parentId: '#sidebar-list',
            initialState: {
              isSpread: false,
              document,
            },
            onAdd: this.onAdd,
            onRemove: this.onRemove,
          })
      )
      .join('')

    return `
      <button class="toggle">토글</button>
      <h4 class="title">${state.document.title}</h4>
      <button class="add">추가</button>
      <button class="remove">삭제</button>
    `
  }

  private handleClickEvents(e: Event) {
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
      console.log('remove')
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

  private handleClickRemove($target: HTMLElement) {
    // const $li = $target.closest('li') as HTMLLIElement
    // if ($li) {
    //   const { documentId } = $li.dataset
    //   documentId && this.onRemove(documentId)
    // }
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

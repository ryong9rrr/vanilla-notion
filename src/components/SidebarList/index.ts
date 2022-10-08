import Component from '~/core/component'
import Router from '~/core/router'
import { IDocument } from '~/models/document'
import { CLASS_NAME, makeListHtml } from './template'

type State = {
  documents: IDocument[]
}

interface Props {
  parentId: string
  initialState: State
  onAdd: (documentId: string, title: string) => void
  onRemove: (documentId: string) => void
}

export default class SidebarList extends Component<State> {
  onAdd: (documentId: string, title: string) => void
  onRemove: (documentId: string) => void
  constructor({ parentId, initialState, onAdd, onRemove }: Props) {
    super({ parentId, initialState, tag: 'ul' })
    this.onAdd = onAdd
    this.onRemove = onRemove
    this.attachEventHandler('click', this.handleClickEvents)
  }

  template(state: State): string {
    return makeListHtml(state.documents)
  }

  private handleClickEvents(e: Event) {
    const $target = e.target as HTMLElement
    if ($target.classList.contains(CLASS_NAME.toggleButton)) {
      console.log('토글!')
      return
    }

    if ($target.classList.contains(CLASS_NAME.addButton)) {
      this.handleClickAdd($target)
      return
    }

    if ($target.classList.contains(CLASS_NAME.removeButton)) {
      this.handleClickRemove($target)
      return
    }

    if ($target.classList.contains(CLASS_NAME.list)) {
      this.handleClickList($target)
      return
    }
  }

  private handleClickAdd($target: HTMLElement) {
    const $li = $target.closest('li') as HTMLLIElement
    const title = ($li.querySelector('h4') as HTMLElement).textContent
    if ($li) {
      const { documentId } = $li.dataset
      documentId && this.onAdd(documentId, title || '')
    }
  }

  private handleClickRemove($target: HTMLElement) {
    const $li = $target.closest('li') as HTMLLIElement
    if ($li) {
      const { documentId } = $li.dataset
      documentId && this.onRemove(documentId)
    }
  }

  private handleClickList($target: HTMLElement) {
    const $li = $target.closest('li') as HTMLLIElement
    if ($li) {
      const { documentId } = $li.dataset
      documentId && Router.navigate(`/document/${documentId}`)
    }
  }
}

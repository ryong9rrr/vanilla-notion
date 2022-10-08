import Component from '~/core/component'
import { CLASS_NAME, makeListHtml } from './template'
import { attachToggleEventHandler, hasClassName } from '~/utils/toggle'
import Router from '~/core/router'
import { IDocument } from '~/models/document'

type State = {
  documents: IDocument[]
}

interface Props {
  parentId: string
  initialState: State
  onAdd?: (documentId?: string, title?: string) => void
  onRemove?: (documentId?: string, title?: string) => void
}

export default class SideBar extends Component<State> {
  onAdd?: (documentId?: string, title?: string) => void
  onRemove?: (documentId?: string, title?: string) => void
  constructor({ parentId, initialState, onAdd, onRemove }: Props) {
    super({ parentId, initialState })
    this.onAdd = onAdd
    this.onRemove = onRemove
    this.attachEventHandler('click', this.handleClickEvents)
  }

  template(state: State): string {
    return `
      <header id="sidebar-header" class="sidebar-component">
        📔 상윤의 notion
      </header>
      <div id="sidebar-list">
        ${makeListHtml(state.documents)}
      </div>
      <div id="root-add-button" class="sidebar-component">
        + 새 페이지
      </div>
    `
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

    if (hasClassName($target, CLASS_NAME.title)) {
      this.handleClickSidebarList($target)
      return
    }

    if (hasClassName($target, CLASS_NAME.addButton)) {
      this.handleClickCreateChildDocument($target)
      return
    }

    if (hasClassName($target, CLASS_NAME.removeButton)) {
      this.handleClickRemoveButton($target)
      return
    }

    // 이렇게 하면 클릭이 잘 안되고 이벤트가 너무 많이 일어난다.
    if ($target.getElementsByClassName('caret')) {
      attachToggleEventHandler(this.$container)
      return
    }
  }

  private handleClickSidebarHeader() {
    Router.navigate('/')
  }

  private handleClickCreateRootDocument() {
    this.onAdd && this.onAdd()
  }

  private handleClickSidebarList($target: HTMLElement) {
    const $li = $target.closest('li') as HTMLLIElement
    if ($li) {
      const { documentId } = $li.dataset
      Router.navigate(`/document/${documentId}`)
    }
  }

  private handleClickCreateChildDocument($target: HTMLElement) {
    const $li = $target.closest('li') as HTMLLIElement
    if ($li) {
      const { documentId } = $li.dataset
      const $span = $li.querySelector(`.${CLASS_NAME.title}`) as HTMLSpanElement
      if ($span) {
        const title = $span.textContent || ''
        this.onAdd && this.onAdd(documentId, title)
      }
    }
  }

  private handleClickRemoveButton($target: HTMLElement) {
    const $li = $target.closest('li') as HTMLLIElement
    if ($li) {
      const { documentId } = $li.dataset
      const $span = $li.querySelector(`.${CLASS_NAME.title}`) as HTMLSpanElement
      if ($span) {
        const title = $span.textContent || ''
        this.onRemove && this.onRemove(documentId, title)
      }
    }
  }
}

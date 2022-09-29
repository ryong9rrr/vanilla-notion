import Component from '~/core/component'
import { Props, State } from './types'
import { CLASS_NAME, template } from './template'
import { attachToggleEventHandler, hasClassName } from '~/utils/toggle'

export default class SideBar extends Component<State> {
  onAdd?: (documentId?: string, title?: string) => void
  onRemove?: (documentId?: string, title?: string) => void
  constructor({ parentId, initialState, onAdd, onRemove }: Props) {
    super({ parentId, initialState, tag: 'div', template })

    this.onAdd = onAdd
    this.onRemove = onRemove

    attachToggleEventHandler(this.$container)
    this.attachEventHandler('click', this.handleClickEvents)
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
  }

  private handleClickSidebarHeader() {
    // 홈으로 보내야한다.
  }

  private handleClickCreateRootDocument() {
    this.onAdd && this.onAdd()
  }

  private handleClickSidebarList($target: HTMLElement) {
    const $li = $target.closest('li') as HTMLLIElement
    if ($li) {
      const { documentId } = $li.dataset
      // push(`/document/${documentId}`) 로 보내야한다.
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

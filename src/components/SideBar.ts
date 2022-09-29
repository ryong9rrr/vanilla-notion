import { push } from '../core/router'
import { isCalledByNew, isValidTypeOfObject } from '../core/validate'
import { TYPE_SIDEBAR_STATE } from '../types/state'
import { hasClassName } from '../utils/constant'
import { attachToggleEventHandler } from '../utils/toggle'
import { CLASS_NAME, template } from './SideBar.template'

const clickedSideBarHeader = () => push('/')

const clickedSideBarList = (target: any) => {
  const $li = target.closest('li')
  if ($li) {
    const { documentId } = $li.dataset
    push(`/document/${documentId}`)
  }
}

const clickedRootDocumentAddButton = (onAdd: any) => onAdd(null)

const clickedChildDocumentAddButton = (target: any, onAdd: any) => {
  const $li = target.closest('li')
  if ($li) {
    const { documentId } = $li.dataset
    const title = $li.querySelector(`.${CLASS_NAME.title}`).textContent
    onAdd(documentId, title)
  }
}

const clickedRemoveButton = (target: any, onRemove: any) => {
  const $li = target.closest('li')
  if ($li) {
    const { documentId } = $li.dataset
    const title = $li.querySelector(`.${CLASS_NAME.title}`).textContent
    onRemove(documentId, title)
  }
}

const attachClickEventHander = (e: any, { onAdd, onRemove }: any) => {
  const { target } = e
  if (target.id === 'sidebar-header') return clickedSideBarHeader()

  if (target.id === 'root-add-button') return clickedRootDocumentAddButton(onAdd)

  if (hasClassName(target, CLASS_NAME.title)) return clickedSideBarList(target)

  if (hasClassName(target, CLASS_NAME.addButton))
    return clickedChildDocumentAddButton(target, onAdd)

  if (hasClassName(target, CLASS_NAME.removeButton)) return clickedRemoveButton(target, onRemove)
}

export default function SideBar({ $target, initialState, onAdd, onRemove }: any) {
  isCalledByNew(new.target, 'SideBar')
  const $container = document.createElement('div')
  $target.appendChild($container)
  $container.addEventListener('click', (e) => attachClickEventHander(e, { onAdd, onRemove }))

  this.state = isValidTypeOfObject(initialState, TYPE_SIDEBAR_STATE)

  this.setState = (nextState: any) => {
    this.state = isValidTypeOfObject(nextState, TYPE_SIDEBAR_STATE)
    this.render()
  }

  this.render = () => {
    $container.innerHTML = template(this.state)
    attachToggleEventHandler($container)
  }

  this.render()
}

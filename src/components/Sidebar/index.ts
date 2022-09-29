// import { push } from '../core/router'
// import { isCalledByNew, isValidTypeOfObject } from '../core/validate'
// import { TYPE_SIDEBAR_STATE } from '../types/state'
// import { hasClassName } from '../utils/constant'
// import { attachToggleEventHandler } from '../utils/toggle'
// import { CLASS_NAME, template } from './SideBar.template'

import Component from '~/core/component'
import { Props, State } from './types'
import { template } from './template'

// const clickedSideBarHeader = () => push('/')

// const clickedSideBarList = (target: any) => {
//   const $li = target.closest('li')
//   if ($li) {
//     const { documentId } = $li.dataset
//     push(`/document/${documentId}`)
//   }
// }

// const clickedRootDocumentAddButton = (onAdd: any) => onAdd(null)

// const clickedChildDocumentAddButton = (target: any, onAdd: any) => {
//   const $li = target.closest('li')
//   if ($li) {
//     const { documentId } = $li.dataset
//     const title = $li.querySelector(`.${CLASS_NAME.title}`).textContent
//     onAdd(documentId, title)
//   }
// }

// const clickedRemoveButton = (target: any, onRemove: any) => {
//   const $li = target.closest('li')
//   if ($li) {
//     const { documentId } = $li.dataset
//     const title = $li.querySelector(`.${CLASS_NAME.title}`).textContent
//     onRemove(documentId, title)
//   }
// }

// const attachClickEventHander = (e: any, { onAdd, onRemove }: any) => {
//   const { target } = e
//   if (target.id === 'sidebar-header') return clickedSideBarHeader()

//   if (target.id === 'root-add-button') return clickedRootDocumentAddButton(onAdd)

//   if (hasClassName(target, CLASS_NAME.title)) return clickedSideBarList(target)

//   if (hasClassName(target, CLASS_NAME.addButton))
//     return clickedChildDocumentAddButton(target, onAdd)

//   if (hasClassName(target, CLASS_NAME.removeButton)) return clickedRemoveButton(target, onRemove)
// }

export default class SideBar extends Component<State> {
  constructor({ parentId, initialState, onAdd, onRemove }: Props) {
    super({ parentId, initialState, tag: 'div', template })
  }
}

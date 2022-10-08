import { IDocument } from '~/models/document'

export const CLASS_NAME = {
  list: 'sidebar-document-list',
  addButton: 'sidebar-document-add-button',
  toggleButton: 'sidebar-document-toggle-button',
  removeButton: 'sidebar-document-remove-button',
  title: 'sidebar-document-list-title',
  addAndRemoveButton: 'sidebar-add-remove-button',
} as const

export const makeListHtml = (documents: IDocument[], depth = 1): string => {
  if (documents.length === 0) {
    return `
      <ul class="nested sidebar-document-list-last" style="padding-left:${15 * depth}px">
        하위 페이지가 없어요.
      </ul>`
  }

  return documents
    .map(
      ({ id, title, documents }) => `
        <ul class="${depth > 1 ? 'nested' : ''}">
          <li class="${CLASS_NAME.list} sidebar-component" style="padding-left:${
        15 * depth
      }px" data-document-id="${id}">
            <span class="${CLASS_NAME.toggleButton} caret"></span>
            <span class="${CLASS_NAME.title}">${title}</span>
            <button class="${CLASS_NAME.removeButton} sidebar-add-remove-button">삭제</button>
            <button class="${CLASS_NAME.addButton} sidebar-add-remove-button">추가</button>
          </li>
          ${makeListHtml(documents, depth + 1)}
        </ul>
`
    )
    .join('')
}

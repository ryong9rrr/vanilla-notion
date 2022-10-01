import { State } from './types'

export const template = (state: State) => {
  const { document } = state
  if (!document.id) {
    return ''
  }
  const { title, content } = document
  return `
    <input name="title" placeholder="제목을 입력하세요." value="${title}" />
    <textarea name="content" placeholder="내용을 입력하세요." >${content}</textarea>
    `
}

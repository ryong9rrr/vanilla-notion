import { State } from './types'

export default function template(state: State): string {
  const { document } = state
  if (!document) {
    return ''
  }
  const { title, content } = document
  return `
    <input name="title" placeholder="제목을 입력하세요." value="${title}" />
    <textarea name="content" placeholder="내용을 입력하세요." >${content}</textarea>
    `
}

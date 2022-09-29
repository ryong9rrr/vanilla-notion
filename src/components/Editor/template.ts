import { State } from './types'

export const ID_NAME = {
  title: 'editor-title',
  content: 'editor-content',
}

export const template = (state: State) => {
  if (!state.title) {
    return ''
  }
  const { title, content } = state
  return `
    <div id="notion-editor-container">
      <input id="${ID_NAME.title}" type="text" name="title" placeholder="제목을 입력하세요." value="${title}" />
      <textarea id="${ID_NAME.content}" name="content" placeholder="내용을 입력하세요." >${content}</textarea>
    </div>
    `
}

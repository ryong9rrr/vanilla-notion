import { State } from './types'

export default function template(state: State): string {
  const { isView } = state
  if (!isView) {
    return ''
  }

  return `
  <div class="modal-overlay">
    <div class="modal-wrapper">
      <div class="modal-contents">
        <input name="title" placeholder="제목을 입력하세요" />
      </div>
    </div>
  </div>
`
}

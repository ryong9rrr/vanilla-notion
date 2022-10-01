import { State } from './types'

export const template = (state: State) => {
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

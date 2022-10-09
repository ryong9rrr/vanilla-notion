import { State } from './types'

export default function template(state: State): string {
  if (!state.isParentSpread) {
    return ''
  }

  return `
    <div style="margin-left:${state.depth * 15}px">
      <span>하위 페이지가 없습니다.</span>
    </div>
  `
}

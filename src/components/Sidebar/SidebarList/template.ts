import { pad } from '~/utils/constants'
import { State } from './types'

export default function template(state: State): string {
  if (!state.isParentSpread) return ''
  return `
    <div style="margin-left:${state.depth * 15}px">
      <button class="toggle">${!state.isSpread ? '▶︎' : '▼'}</button>
      <h4 class="title">${pad(state.document.title)}</h4>
      <button class="remove">🗑</button>
      <button class="add">+</button>
    </div>
    <div class="sub-components"></div>
  `
}

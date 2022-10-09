import { State } from './types'

export default function template(state: State): string {
  return `
    <header id="sidebar-header" class="sidebar-component">
      📔 상윤의 notion
    </header>
    <div id="sidebars"></div>
    <div id="root-add-button" class="sidebar-component">
      + 새 페이지
    </div>
  `
}

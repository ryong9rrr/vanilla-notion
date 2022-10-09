import Component from '~/core/component'

type State = {
  isParentSpread: boolean
  depth: number
}

interface Props {
  parentElement: HTMLElement
  initialState: State
}

export default class LastNode extends Component<State> {
  constructor({ parentElement, initialState }: Props) {
    super({ parentElement, initialState })
    this.element.classList.add('sidebar-list')
  }

  template(state: State): string {
    if (!state.isParentSpread) return ''
    return `
      <div style="margin-left:${state.depth * 15}px">
        <span>하위 페이지가 없습니다.</span>
      </div>
    `
  }
}

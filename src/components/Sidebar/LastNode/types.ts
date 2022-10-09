export type State = {
  isParentSpread: boolean
  depth: number
}

export interface Props {
  parentElement: HTMLElement
  initialState: State
}

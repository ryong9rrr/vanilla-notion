import { OnSubmit } from '~/models/document'

export type State = {
  parentNodeId?: number
  isView: boolean
}

export interface Props {
  parentElement: HTMLElement
  onSubmit: OnSubmit
}

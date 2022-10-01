import { OnSubmit } from '~/models/document'

export interface State {
  parentNodeId?: number
  isView: boolean
}

export interface Props {
  parentId: string
  onSubmit: OnSubmit
}

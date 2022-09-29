import { IDocument } from '~/models/document'

export interface State {
  documents: IDocument[]
}

export interface Props {
  parentId: string
  initialState: State
  onAdd?: () => void
  onRemove?: () => void
}

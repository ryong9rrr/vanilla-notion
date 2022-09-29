import { IDocument } from '~/models/document'

export interface State {
  documents: IDocument[]
}

export interface Props {
  parentId: string
  initialState: State
  onAdd?: (documentId?: string, title?: string) => void
  onRemove?: (documentId?: string, title?: string) => void
}

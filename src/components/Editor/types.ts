import { IDocument, OnEditing } from '~/models/document'

export interface State {
  document: Partial<IDocument>
}

export interface Props {
  parentId: string
  onEditing: OnEditing
}

import { IDocument, OnEditing } from '~/models/document'

export interface State {
  document: any
}

export interface Props {
  parentId: string
  onEditing: OnEditing
}

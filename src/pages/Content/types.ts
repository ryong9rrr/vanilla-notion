import { IDocument, OnEditing } from '~/models/document'

export type State = {
  document: Required<IDocument> | null
}
export interface Props {
  parentId: string
  onEditing: OnEditing
}

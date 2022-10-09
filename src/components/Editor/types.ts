import { IDocument, OnEditing } from '~/models/document'

export type State = {
  document: IDocument | null
}

export interface Props {
  parentElement: HTMLElement
  onEditing: OnEditing
}

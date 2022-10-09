import { IDocument } from '~/models/document'

export type State = {
  isParentSpread: boolean
  isSpread: boolean
  document: IDocument
  subDocuments: IDocument[]
  depth: number
}

export interface Props {
  parentElement: HTMLElement
  initialState: State
  onAdd: (documentId: number, title: string) => void
  onRemove: (documentId: number, title: string) => void
}

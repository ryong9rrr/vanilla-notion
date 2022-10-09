import { IDocument } from '~/models/document'

export type State = {
  documents: IDocument[]
}

export interface Props {
  parentElement: HTMLElement
  initialState: State
  onAdd: (documentId?: number, title?: string) => void
  onRemove: (documentId: number, title: string) => void
}

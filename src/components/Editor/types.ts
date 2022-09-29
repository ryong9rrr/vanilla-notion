import { IDocument } from '~/models/document'

export interface State {
  id?: number
  title?: string
  content?: string
  documents?: IDocument[]
  createdAt?: string
  updatedAt?: string
}

export interface Props {
  parentId: string
  onEditing?: (id: number, { title, content }: { title: string; content: string }) => void
}

export type IDocument = {
  id: number
  title: string
  documents: IDocument[]
  content?: string
  createdAt?: string
  updatedAt?: string
}

export type OnEditing = ({
  id,
  title,
  content,
}: {
  id: number
  title: string
  content: string
}) => void

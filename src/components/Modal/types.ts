export interface State {
  parentNodeId?: number
  isView: boolean
}

export interface Props {
  parentId: string
  onSubmit?: (parentNodeId: number, title: string) => void
}

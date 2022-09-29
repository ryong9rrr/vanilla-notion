export interface State {
  parentNodeId?: number
  isView: boolean
}

export interface Props {
  parentId: string
  onSubmit?: ({ title, parentNodeId }: { title: string; parentNodeId?: number }) => void
}

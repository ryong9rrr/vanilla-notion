export interface State {
  parentId?: string
  isView: boolean
}

export interface Props {
  parentId: string
  onSubmit?: (parentId: string, title: string) => void
}

import { IDocument } from './models/document'

export interface State {
  documents: IDocument[]
}

export interface Props {
  root: HTMLElement
  initialState: State
}

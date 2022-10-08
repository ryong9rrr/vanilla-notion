import View from '~/core/view'

const template = () => `<h1>404 Not Found</h1>`

interface State {}

interface Props {
  parentId: string
}

const initialState: State = {}

export default class NotFoundPage extends View<State> {
  constructor({ parentId }: Props) {
    super({ parentId, initialState, template })
  }
}

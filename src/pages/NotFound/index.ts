import View from '~/core/view'

const template = () => `<h1>404 Not Found</h1>`

interface Props {
  parentId: string
}

export default class NotFoundPage extends View {
  constructor({ parentId }: Props) {
    super({ parentId, template })
  }
}

import View from '~/core/view'

interface Props {
  parentId: string
}

export default class NotFoundPage extends View {
  constructor({ parentId }: Props) {
    super({ parentId })
  }

  template(): string {
    return `<h1>404 Not Found</h1>`
  }
}

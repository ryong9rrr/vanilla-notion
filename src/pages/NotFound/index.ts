import View from '~/core/view'

interface Props {
  parentElement: HTMLElement
}

export default class NotFoundPage extends View {
  constructor({ parentElement }: Props) {
    super({ parentElement })
  }

  template(): string {
    return `<h1>404 Not Found</h1>`
  }
}

const template = `<h1>404 Not Found</h1>`

interface Props {
  parentId: string
}

export default class NotFoundPage {
  parentId: string
  constructor({ parentId }: Props) {
    this.parentId = parentId

    this.render()
  }

  render() {
    const $container = document.querySelector(this.parentId) as HTMLElement
    $container.innerHTML = template
  }
}

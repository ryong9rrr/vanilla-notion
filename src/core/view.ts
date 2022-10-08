interface Props {
  parentId: string
}

export default abstract class View {
  protected parentId: string

  constructor({ parentId }: Props) {
    this.parentId = parentId
  }

  render() {
    this.mount()
    this.componentDidMount()
  }

  protected componentDidMount() {}

  private mount() {
    const $parentElement = document.querySelector(this.parentId) as HTMLElement
    $parentElement.innerHTML = this.template()
  }

  abstract template(): string
}

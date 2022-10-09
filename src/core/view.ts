interface Props {
  parentElement: HTMLElement
}

export default abstract class View {
  protected parentElement: HTMLElement

  constructor({ parentElement }: Props) {
    if (!parentElement) {
      throw new Error(`${parentElement}가 존재하지 않아요.`)
    }
    this.parentElement = parentElement
  }

  render() {
    this.mount()
    this.componentDidMount()
  }

  protected componentDidMount() {}

  private mount() {
    this.parentElement.innerHTML = this.template()
  }

  abstract template(): string
}

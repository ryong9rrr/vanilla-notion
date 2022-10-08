type Handler = (e: Event) => void

type Props<T> = {
  parentId: string
  tag?: string
  initialState: T
}

export default abstract class Component<T> {
  private prevState: string
  parentId: string
  $container: HTMLElement
  state: T

  constructor({ parentId, tag, initialState }: Props<T>) {
    this.parentId = parentId
    this.$container = tag ? document.createElement(tag) : document.createElement('div')
    this.state = initialState
    this.prevState = JSON.stringify(this.state)

    this.render()
  }

  setState(nextState: T) {
    if (this.isDiff(nextState)) {
      this.state = nextState
      this.render()
      this.componentDidUpdate()
    }
  }

  private render() {
    this.mount()
    this.componentDidMount()
  }

  protected componentDidMount() {}

  protected componentDidUpdate() {}

  protected attachEventHandler(eventType: string, handler: Handler): void {
    if (!this.$container) {
      console.error('엘리먼트가 존재하지 않아요.')
    } else {
      this.$container.addEventListener(eventType, handler.bind(this))
    }
  }

  private mount() {
    const $parentElement = document.querySelector(this.parentId) as HTMLElement
    $parentElement.appendChild(this.$container)
    this.$container.innerHTML = this.template(this.state)
  }

  private isDiff(state: T) {
    const nextState = JSON.stringify(state)
    if (this.prevState !== nextState) {
      this.prevState = nextState
      return true
    }
    return false
  }

  abstract template(state: T): string
}

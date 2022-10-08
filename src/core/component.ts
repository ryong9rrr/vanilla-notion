type EventHandler = (e: Event) => void

type Props<T> = {
  parentId: string
  tag?: string
  initialState: T
}

export default abstract class Component<T> {
  private prevState: string
  parentId: string
  $container: HTMLElement
  _state: T

  constructor({ parentId, tag, initialState }: Props<T>) {
    this.parentId = parentId
    this.$container = tag ? document.createElement(tag) : document.createElement('div')
    this._state = initialState
    this.prevState = JSON.stringify(this._state)

    this.render()
  }

  get state() {
    return this._state
  }

  set state(nextState: T) {
    throw new SyntaxError('직접 state를 변경하지말고 setState 메서드를 이용하세요.')
  }

  setState(nextState: T) {
    if (this.isDiff(nextState)) {
      this._state = nextState
      this.render()
      this.componentDidUpdate()
    }
  }

  private render(append = true) {
    this.mount(append)
    this.componentDidMount()
  }

  protected componentDidMount() {}

  protected componentDidUpdate() {}

  protected attachEventHandler(eventType: string, eventHandler: EventHandler): void {
    if (!this.$container) {
      console.error('엘리먼트가 존재하지 않아요.')
      return
    }
    this.$container.addEventListener(eventType, eventHandler.bind(this))
  }

  private mount(append: boolean) {
    const $parentElement = document.querySelector(this.parentId) as HTMLElement
    if (append) {
      $parentElement.appendChild(this.$container)
    }
    this.$container.innerHTML = this.template(this._state)
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

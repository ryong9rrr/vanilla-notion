type EventHandler = (e: Event) => void

type Template<T> = (state: T) => string

type Props<T> = {
  parentElement: HTMLElement
  initialState: T
  template: Template<T>
  tag?: string
}

export default abstract class Component<T> {
  private _state: T
  private prevState: string
  private template: Template<T>
  parentElement: HTMLElement
  element: HTMLElement

  constructor({ parentElement, initialState, template, tag }: Props<T>) {
    this.parentElement = parentElement
    if (!this.parentElement) {
      throw new Error(`${this.parentElement}가 존재하지 않아요.`)
    }
    this.element = tag ? document.createElement(tag) : document.createElement('div')
    this._state = initialState
    this.template = template
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

  private render() {
    this.mount()
    this.componentDidMount()
  }

  protected componentDidMount() {}

  protected componentDidUpdate() {}

  protected attachEventHandler(eventType: string, eventHandler: EventHandler): void {
    if (!this.element) {
      console.error('엘리먼트가 존재하지 않아요.')
      return
    }
    this.element.addEventListener(eventType, eventHandler.bind(this))
  }

  private mount() {
    this.parentElement.appendChild(this.element)
    this.element.innerHTML = this.template(this._state)
  }

  private isDiff(state: T) {
    const nextState = JSON.stringify(state)
    if (this.prevState !== nextState) {
      this.prevState = nextState
      return true
    }
    return false
  }
}

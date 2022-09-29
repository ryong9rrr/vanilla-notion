type Handler = (e: Event) => void

type Props<T> = {
  parentId: string
  tag: string
  initialState: T
  template: (state: T) => string
}

export default class Component<T> {
  private prevState: string
  parentId: string
  $container: HTMLElement
  state: T
  template: (state: T) => string
  //components: Component<any>[] = []

  constructor({ parentId, tag, initialState, template }: Props<T>) {
    this.parentId = parentId
    this.$container = document.createElement(tag)
    this.state = initialState
    this.prevState = JSON.stringify(this.state)
    this.template = template

    this.render()
  }

  protected attachEventHandler(eventType: string, handler: Handler): void {
    if (!this.$container) {
      console.error('엘리먼트가 존재하지 않아요.')
    } else {
      this.$container.addEventListener(eventType, handler.bind(this))
    }
  }

  private isDiff(state: T) {
    const nextState = JSON.stringify(state)
    if (this.prevState !== nextState) {
      this.prevState = nextState
      return true
    }
    return false
  }

  setState(nextState: T) {
    if (this.isDiff(nextState)) {
      this.state = nextState
      this.render(false) // 상태를 업데이트 한다는 것은 이미 렌더링된 컴포넌트라는 것
    }
  }

  // 따라서 렌더링시킬거라면 true(기본값)를, 상태만 변경할것이라면 false를 줘서 새로 DOM을 추가하지 않도록한다.
  render(initialize: boolean = true) {
    const $parentElement = document.querySelector(this.parentId) as HTMLElement
    if (initialize) {
      $parentElement.appendChild(this.$container)
    }
    this.$container.innerHTML = this.template(this.state)
  }
}

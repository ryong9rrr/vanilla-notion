import Component from './component'

interface Props<T> {
  parentId: string
  initialState: T
  template: () => string
}

export default class View<T> {
  parentId: string
  state: T
  template: () => string
  subscribers: Component<unknown>[] = []

  constructor({ parentId, initialState, template }: Props<T>) {
    this.parentId = parentId
    this.state = initialState
    this.template = template
  }

  render() {
    this.mount()
    this.subscribers.forEach((component) => component.render())
  }

  private mount() {
    const $parentElement = document.querySelector(this.parentId) as HTMLElement
    $parentElement.innerHTML = this.template()
  }
}

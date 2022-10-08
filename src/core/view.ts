import Component from './component'

type Listener = () => void

interface Props {
  parentId: string
  template: () => string
}

export default class View {
  parentId: string
  template: () => string

  constructor({ parentId, template }: Props) {
    this.parentId = parentId
    this.template = template
  }

  componentDidMount() {}

  render() {
    this.mount()
    this.componentDidMount()
  }

  private mount() {
    const $parentElement = document.querySelector(this.parentId) as HTMLElement
    $parentElement.innerHTML = this.template()
  }
}

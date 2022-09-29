import { isCalledByNew, isValidTypeOfObject } from '../core/validate'
import { TYPE_EDITOR_STATE } from '../types/state'
import { ID_NAME, template } from './Editor.template'

export default function Editor({ $target, onEditing }: any) {
  isCalledByNew(new.target, 'Editor')
  const $container = document.createElement('div')

  $container.addEventListener('keyup', (e: any) => {
    const { id, value } = e.target
    if (id === ID_NAME.title) this.state.title = value
    if (id === ID_NAME.content) this.state.content = value
    onEditing(this.state.id, {
      title: this.state.title,
      content: this.state.content,
    })
  })

  this.state = null
  this.setState = (nextState: any) => {
    this.state = isValidTypeOfObject(nextState, TYPE_EDITOR_STATE)
    this.render()
  }

  this.render = () => {
    if (!this.state) return
    $container.innerHTML = template(this.state)
    $target.appendChild($container)
  }

  this.render()
}

import { isCalledByNew, isValidTypeOfObject } from '../core/validate'
import { TYPE_MODAL_STATE } from '../types/state'
import { ID_NAME, template } from './Modal.template'

const attachEventHandler = ({ $target, closeModal }: any) => {
  $target.addEventListener('click', closeModal)
  $target.addEventListener('keydown', (e: any) => {
    if (e.key === 'Tab') {
      e.preventDefault()
    }
  })
}

export default function Modal({
  $target,
  initialState = {
    isView: false,
    parentId: null,
  },
  onSubmit,
}: any) {
  isCalledByNew(new.target, 'Modal')
  const $container = document.createElement('div')
  $target.appendChild($container)

  const closeModal = (e: any) => {
    if (e.target.id !== ID_NAME.modalWrapper) return
    const $input = $container.querySelector(`#${ID_NAME.modalInput}`) as HTMLInputElement
    const title = $input.value
    if (typeof title === 'string' && title !== '') {
      onSubmit({
        title,
        parent: this.state.parentId,
      })
    }
    this.setState({
      ...this.state,
      isView: false,
    })
  }

  attachEventHandler({ $target: $container, closeModal })

  this.state = isValidTypeOfObject(initialState, TYPE_MODAL_STATE)

  this.setState = (nextState: any) => {
    this.state = isValidTypeOfObject(nextState, TYPE_MODAL_STATE)
    this.render()
  }

  this.render = () => {
    const { isView } = this.state
    $container.innerHTML = template(this.state)
    if (isView) {
      const input = $container.querySelector('input[name=title]') as HTMLInputElement
      input.focus()
    }
  }

  this.render()
}

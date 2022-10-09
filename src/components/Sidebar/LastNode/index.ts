import Component from '~/core/component'
import { Props, State } from './types'
import template from './template'

export default class LastNode extends Component<State> {
  constructor({ parentElement, initialState }: Props) {
    super({ parentElement, initialState, template })
    this.element.classList.add('sidebar-list')
  }
}

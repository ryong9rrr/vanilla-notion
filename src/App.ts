import { Sidebar } from './components'

export default class App {
  constructor(parentId: string) {
    new Sidebar({
      parentId,
      initialState: {
        documents: [],
      },
    })
  }
}

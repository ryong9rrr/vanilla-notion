import './style/index.css'
import Router from './core/router'
import documentApi from './services/document'
import { ContentPage, NotFoundPage, HomePage } from './pages'
import { Modal, Sidebar } from './components'
import template from './App.template'
import { Props, State } from './App.types'

let debounceTimer = null as any

export default class App {
  router = new Router()
  state: State
  modalComponent: Modal
  sidebarComponent: Sidebar
  homePage: HomePage
  contentPage: ContentPage
  notFoundPage: NotFoundPage
  constructor({ root, initialState }: Props) {
    root.innerHTML = this.template()
    this.state = initialState

    this.modalComponent = new Modal({
      parentElement: document.querySelector('body') as HTMLElement,
      onSubmit: this.handleCreateNewDocument.bind(this),
    })
    this.sidebarComponent = new Sidebar({
      parentElement: document.querySelector('#notion-app-sidebar') as HTMLElement,
      initialState: {
        documents: this.state.documents,
      },
      onAdd: this.handleClickSidebarAddButton.bind(this),
      onRemove: this.handleClickSidebarRemoveButton.bind(this),
    })

    this.homePage = new HomePage({
      parentElement: document.querySelector('#notion-app-content') as HTMLElement,
    })

    this.contentPage = new ContentPage({
      parentElement: document.querySelector('#notion-app-content') as HTMLElement,
      onEditing: this.handleEditing.bind(this),
    })

    this.notFoundPage = new NotFoundPage({ parentElement: root })

    this.fetchDocuments()
  }

  route() {
    this.router.setDefaultPage(this.homePage)
    this.router.addRoutePath(/^\/document\/[\w]+\/?$/, this.contentPage)
    this.router.setNotFoundPage(this.notFoundPage)
  }

  private template = template

  private setState(nextState: State) {
    this.state = nextState
    this.sidebarComponent.setState({
      documents: this.state.documents,
    })
  }

  private async fetchDocuments() {
    const documents = await documentApi.getAllDocument()
    this.setState({
      ...this.state,
      documents,
    })
  }

  private async handleCreateNewDocument({
    title,
    parentNodeId,
  }: {
    title: string
    parentNodeId?: number
  }) {
    const newDocument = await documentApi.postNewDocument({ title, parentNodeId })
    const documents = await documentApi.getAllDocument()
    this.setState({ ...this.state, documents })
    Router.navigate(`/document/${newDocument.id}`)
  }

  private async handleClickSidebarAddButton(documentId?: number, title?: string) {
    if (!documentId) {
      if (window.confirm(`새로운 페이지를 생성할까요?`)) {
        this.openModal()
      }
    } else {
      if (window.confirm(`${title} 페이지 아래에 하위페이지를 추가할까요?`)) {
        this.openModal(documentId)
      }
    }
  }

  private async handleClickSidebarRemoveButton(documentId: number, title: string) {
    if (window.confirm(`${title} 페이지를 삭제할까요?`)) {
      await documentApi.removeDocument(documentId)
      const documents = await documentApi.getAllDocument()
      const id = window.location.pathname.replace('/document/', '')
      if (Number(id) === documentId) {
        Router.navigate('/')
      }
      this.setState({ ...this.state, documents })
    }
  }

  private openModal(documentId?: number) {
    this.modalComponent.setState({
      isView: true,
      parentNodeId: documentId,
    })
  }

  private async handleEditing({
    id,
    title,
    content,
  }: {
    id: number
    title: string
    content: string
  }) {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(async () => {
      await documentApi.editDocument(id, { title, content })
      const documents = await documentApi.getAllDocument()
      this.setState({ ...this.state, documents })
    }, 2000)
  }
}

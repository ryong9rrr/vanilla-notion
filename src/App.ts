import './style/index.css'
import { Modal, Sidebar } from './components'
import { template } from './App.template'
import { IDocument } from './models/document'
import documentApi from './services/document'
import ContentPage from './pages/Content'
import NotFoundPage from './pages/NotFound'
import SideBar from './components/Sidebar'
import HomePage from './pages/Home'
import Router from './core/router2'

interface State {
  documents: IDocument[]
}

interface Props {
  rootId: string
  initialState: State
}

let debounceTimer = null as any

export default class App {
  router = new Router()
  state: State
  modalComponent: Modal
  sidebarComponent: SideBar
  homePage: HomePage
  contentPage: ContentPage
  notFoundPage: NotFoundPage
  constructor({ rootId, initialState }: Props) {
    this.mount(rootId)
    this.state = initialState

    this.modalComponent = new Modal({
      parentId: 'body',
      onSubmit: async ({ title, parentNodeId }) => {
        const newDocument = await documentApi.postNewDocument({ title, parentNodeId })
        this.sidebarComponent.setState({
          documents: await documentApi.getAllDocument(),
        })
        Router.navigate(`/document/${newDocument.id}`)
      },
    })

    this.sidebarComponent = new Sidebar({
      parentId: '#notion-app-sidebar',
      initialState: {
        documents: this.state.documents,
      },
      onAdd: async (documentId?: string, title?: string) => {
        if (!documentId) {
          if (window.confirm(`새로운 페이지를 생성할까요?`)) {
            this.openModal()
          }
        } else {
          if (window.confirm(`${title} 페이지 아래에 하위페이지를 추가할까요?`)) {
            this.openModal(parseInt(documentId, 10))
          }
        }
      },
      onRemove: async (documentId?: string, title?: string) => {
        if (window.confirm(`${title} 페이지를 삭제할까요?`)) {
          if (documentId) {
            history.replaceState(null, '', '/')
            await documentApi.removeDocument(parseInt(documentId, 10))
          }

          this.sidebarComponent.setState({
            documents: await documentApi.getAllDocument(),
          })

          const path = window.location.pathname
          if (path.indexOf('/document/') === 0) {
            const [, , prevDocumentId] = path.split('/')
            if (documentId === prevDocumentId) {
              Router.navigate('/')
            }
          }
        }
      },
    })

    this.homePage = new HomePage({ parentId: '#notion-app-content' })

    this.contentPage = new ContentPage({
      parentId: '#notion-app-content',
      onEditing: async ({ id, title, content }: { id: number; title: string; content: string }) => {
        await this.handleEditing(id.toString(), { title, content })
      },
    })

    this.notFoundPage = new NotFoundPage({ parentId: rootId })

    this.fetchDocuments()
  }

  private openModal(documentId?: number) {
    this.modalComponent.setState({
      isView: true,
      parentNodeId: documentId,
    })
  }

  private async handleEditing(
    documentId: string,
    { title, content }: { title: string; content: string }
  ) {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(async () => {
      await documentApi.editDocument(parseInt(documentId, 10), { title, content })
      this.sidebarComponent.setState({
        documents: await documentApi.getAllDocument(),
      })
    }, 2000)
  }

  route() {
    this.router.setDefaultPage(this.homePage)
    this.router.addRoutePath(/^\/document\/[\w]+\/?$/, this.contentPage)
    this.router.setNotFoundPage(this.notFoundPage)
  }

  private mount(rootId: string) {
    const $root = document.querySelector(rootId) as HTMLElement
    $root.innerHTML = template
  }

  private async fetchDocuments() {
    const documents = await documentApi.getAllDocument()
    this.setState({
      ...this.state,
      documents,
    })
  }

  private setState(nextState: State) {
    this.state = nextState
    this.sidebarComponent.setState({
      documents: this.state.documents,
    })
  }
}

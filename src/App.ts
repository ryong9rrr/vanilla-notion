import './style/index.css'
import { Modal, Sidebar } from './components'
import { template } from './App.template'
import { IDocument } from './models/document'
import { isNumber } from './utils/constants'
import documentApi from './services/document'
import { push, redirect } from './core/router'
import ContentPage from './pages/Content'
import NotFoundPage from './pages/NotFound'
import SideBar from './components/Sidebar'
import debounce from './utils/debounce' // 이거 디바운스 어떻게 잘사용할 수 있을까
import HomePage from './pages/Home'

interface State {
  path: string
  documents: IDocument[]
}

interface Props {
  rootId: string
  initialState: State
}

let debounceTimer = null as any

export default class App {
  $root: HTMLElement
  rootId: string
  state: State
  modalComponent: Modal
  sidebarComponent: SideBar
  homePage: HomePage
  contentPage: ContentPage
  notFoundPage: NotFoundPage
  constructor({ rootId, initialState }: Props) {
    this.$root = document.querySelector(rootId) as HTMLElement
    this.rootId = rootId
    this.$root.innerHTML = template
    this.state = initialState

    this.modalComponent = new Modal({
      parentId: 'body',
      onSubmit: async ({ title, parentNodeId }) => {
        const newDocument = await documentApi.postNewDocument({ title, parentNodeId })
        this.sidebarComponent.setState({
          documents: await documentApi.getAllDocument(),
        })
        push(`/document/${newDocument.id}`)
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

          if (this.state.path.indexOf('/document/') === 0) {
            const [, , prevDocumentId] = this.state.path.split('/')
            if (documentId === prevDocumentId) {
              redirect()
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

    this.notFoundPage = new NotFoundPage({ parentId: this.rootId })
  }

  setState(nextState: State) {
    this.state = nextState
    this.route()
  }

  openModal(documentId?: number) {
    this.modalComponent.setState({
      isView: true,
      parentNodeId: documentId,
    })
  }

  async handleEditing(documentId: string, { title, content }: { title: string; content: string }) {
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

  async route() {
    const { path } = this.state
    this.sidebarComponent.setState({ documents: this.state.documents })
    const $content = this.$root.querySelector('#notion-app-content') as HTMLElement
    try {
      if (path === '/') {
        this.homePage.setState()
      } else if (path.includes('/document/')) {
        $content.innerHTML = ``
        const [, , documentId] = path.split('/')
        if (!isNumber(documentId)) throw new Error()
        const loadedContent = await documentApi.getDocument(parseInt(documentId, 10))
        this.contentPage.setState({ document: loadedContent })
      } else {
        this.notFoundPage.setState()
      }
    } catch (e: any) {
      console.error(
        `예상치 못한 오류가 발생하여 홈으로 리다이렉트 됩니다. 오류메시지 : ${e.message}`
      )
      redirect()
    }
  }
}

import App from './App'
import { changeRoute } from './core/router'
import DocumentApi from './services/document'

const fetchDocuments = async () => {
  const documents = await new DocumentApi().getAllDocument()

  app.setState({
    ...app.state,
    documents,
  })
}

const app = new App({
  rootId: '#root',
  initialState: {
    path: window.location.pathname,
    documents: [],
  },
})

const route = () =>
  app.setState({
    ...app.state,
    path: window.location.pathname,
  })

changeRoute(route)

window.addEventListener('popstate', route)

fetchDocuments()

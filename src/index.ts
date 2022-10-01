import App from './App'
import { changeRoute } from './core/router'
import documentApi from './services/document'

const fetchDocuments = async () => {
  const documents = await documentApi.getAllDocument()

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

import './style/index.css'
import App from './App'
import { getAllDocument } from './core/api'
import { changeRoute } from './core/router'

const $target = document.querySelector('#root')

const app = new App({
  $target,
  initialState: {
    username: '상윤',
    path: window.location.pathname,
    documents: getAllDocument(),
  },
})

const route = () =>
  app.setState({
    ...app.state,
    path: window.location.pathname,
  })

changeRoute(route)

window.addEventListener('popstate', route)

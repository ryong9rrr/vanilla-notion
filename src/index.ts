import App from './App'

const app = new App({
  root: document.querySelector('#root') as HTMLElement,
  initialState: {
    documents: [],
  },
})

app.route()

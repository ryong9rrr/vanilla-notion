import App from './App'

const app = new App({
  rootId: '#root',
  initialState: {
    documents: [],
  },
})

app.route()

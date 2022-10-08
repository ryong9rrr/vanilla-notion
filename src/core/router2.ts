import View from './view'

const ROUTE_EVENT_TYPE = 'route-change'

type RouteInfo = {
  path: RegExp
  page: View<any>
}

export default class Router {
  static navigate = (path: string) => {
    window.dispatchEvent(
      new CustomEvent(ROUTE_EVENT_TYPE, {
        detail: {
          path,
        },
      })
    )
  }

  private static instance: Router
  private routeTable: RouteInfo[] = []
  private defaultPage: View<any> | null = null
  private notFoundPage: View<any> | null = null

  constructor() {
    if (Router.instance) {
      return Router.instance
    }
    Router.instance = this
    window.addEventListener('load', this.route.bind(this))
    window.addEventListener('popstate', this.route.bind(this))
    window.addEventListener(ROUTE_EVENT_TYPE, ((e: CustomEvent) => {
      const { path } = e.detail
      if (path) {
        window.history.pushState(null, '', path)
        this.route()
      }
    }) as EventListener)
  }

  setDefaultPage(page: View<any>) {
    this.defaultPage = page
  }

  setNotFoundPage(page: View<any>) {
    this.notFoundPage = page
  }

  addRoutePath(path: RegExp, page: View<any>) {
    this.routeTable.push({ path, page })
  }

  route() {
    const { pathname } = window.location
    if (pathname === '/' && this.defaultPage) {
      this.defaultPage.render()
      return
    }

    for (const routeInfo of this.routeTable) {
      const { path, page } = routeInfo
      const isMatched = path.test(pathname)
      if (isMatched) {
        page.render()
        return
      }
    }

    if (this.notFoundPage) {
      this.notFoundPage.render()
    }
  }
}

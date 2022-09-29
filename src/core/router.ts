const ROUTE_CHANGE_EVENT_NAME = 'route-change'

export const changeRoute = (onRoute: any) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, ((e: CustomEvent) => {
    const { nextUrl } = e.detail
    if (nextUrl) {
      history.pushState(null, '', nextUrl)
      onRoute()
    }
  }) as EventListener)
}

export const push = (nextUrl: string) => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: { nextUrl },
    })
  )
}

export const redirect = () => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: { nextUrl: '/' },
    })
  )
}

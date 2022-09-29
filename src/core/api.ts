const API_END_POINT = 'https://kdt-frontend.programmers.co.kr'

export default class Api {
  private API_END_POINT: string

  constructor() {
    this.API_END_POINT = API_END_POINT
  }

  protected async request(url: string, options?: RequestInit) {
    if (url[0] !== '/') {
      throw new Error("please '/' fill in api url")
    }
    try {
      const response = await fetch(`${this.API_END_POINT}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        window.alert('잘못된 요청이에요.')
        throw new Error('fetch response error')
      }
      return response.json()
    } catch (e) {
      window.alert('알 수 없는 오류가 발생했어요.')
      throw new Error('fetch response error')
    }
  }
}
